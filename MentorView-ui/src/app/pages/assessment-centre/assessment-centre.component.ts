import { Component, ElementRef, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';
import { ApiService } from '../../services/api.service';
import { AgoraService } from '../../services/agora.service';
import { COMPANIES, ROLES } from '../../components/interview-details/interview-details.constants';

interface VideoSlot {
  active: boolean;
  stream?: MediaStream;
  micMuted: boolean;
  camActive: boolean;
  name?: string;
  isRecording: boolean;
  mediaRecorder?: MediaRecorder;
  recordedBlobs?: Blob[];
  videoBlob?: Blob;
  transcript?: string;
  loadingTranscript?: boolean;
}

interface TranscriptEntry {
  participantIndex: number;
  text: string;
  timestamp: Date;
}

@Component({
  selector: 'app-assessment-centre',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    SafeHtmlPipe
  ],
  templateUrl: './assessment-centre.component.html',
  styleUrls: ['./assessment-centre.component.css'],
  animations: [
    trigger('slideInOut', [
      state('void', style({
        height: '0',
        opacity: 0,
        overflow: 'hidden'
      })),
      transition('void <=> *', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class AssessmentCentreComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('videoElement1') videoElement1!: ElementRef<HTMLVideoElement>;
  @ViewChild('videoElement2') videoElement2!: ElementRef<HTMLVideoElement>;
  @ViewChild('videoElement3') videoElement3!: ElementRef<HTMLVideoElement>;
  @ViewChild('videoElement4') videoElement4!: ElementRef<HTMLVideoElement>;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('localVideo') localVideoRef!: ElementRef;

  videoSlots: VideoSlot[] = [
    { active: false, micMuted: true, camActive: true, isRecording: false },
    { active: false, micMuted: true, camActive: true, isRecording: false },
    { active: false, micMuted: true, camActive: true, isRecording: false },
    { active: false, micMuted: true, camActive: true, isRecording: false }
  ];

  // Test video URL for voice isolation testing
  testVideoUrl: string = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
  selectedVideoFile: File | null = null;
  
  globalMicMuted = true;
  globalCamActive = true;

  // Interview recording related properties
  isRecording = false;
  transcriptEntries: TranscriptEntry[] = [];
  isSaving = false;
  saveSuccess = false;
  saveError = '';

  // Question generation related properties
  roles: string[] = ROLES;
  companies: string[] = COMPANIES;
  role: string = '';
  company: string = '';
  selectedQuestions: string[] = [];
  isLoadingQuestions = false;
  showQuestionsPanel = true; // Always show questions panel initially
  currentQuestion: string = '';
  errorMessage: string = '';
  customQuestion: string = '';
  debugMode: boolean = false; // Debug mode flag

  // Debounce subjects for input fields
  private roleInputSubject = new Subject<string>();
  private companyInputSubject = new Subject<string>();

  // Video call properties
  agoraAppId = 'befd2ffdc25840beafaaea7d193ace93';
  channelName = 'main';
  localAudioTrack: any = null;
  localVideoTrack: any = null;
  remoteUsers: any = {};
  isChannelJoined = false;
  speechRecognition: any = null;
  transcriptionActive = false;
  participantTranscripts: { [key: number]: string } = {};
  isTranscribing = false;
  audioRecorders: { [key: number]: MediaRecorder } = {};
  audioChunks: { [key: number]: Blob[] } = {};
  audioBlobs: { [key: number]: Blob } = {};
  participantNames: { [key: number]: string } = {
    0: 'Main Participant',
    1: 'Participant 2',
    2: 'Participant 3',
    3: 'Participant 4'
  };

  connectionState: 'IDLE' | 'CONNECTING' | 'CONNECTED' = 'IDLE';
  isAudioEnabled = true;
  isVideoEnabled = true;
  isJoining = false;
  messages: { sender: string; message: string }[] = [];
  newMessage = '';

  activeSlot?: number;

  constructor(private apiService: ApiService, private agoraService: AgoraService) {
    // Set up debounce for role input - wait 800ms after user stops typing
    this.roleInputSubject.pipe(
      debounceTime(800),
      distinctUntilChanged()
    ).subscribe(role => {
      if (role && role !== this.role) {
        this.checkAndLoadQuestions();
      }
    });
    
    // Set up debounce for company input - wait 800ms after user stops typing
    this.companyInputSubject.pipe(
      debounceTime(800),
      distinctUntilChanged()
    ).subscribe(company => {
      if (company && company !== this.company) {
        this.checkAndLoadQuestions();
      }
    });
  }

  ngOnInit(): void {
    // Load questions
    this.loadQuestions();
    
    // Setup Agora event listeners when component is initialized
    this.setupVideoCall();
  }

  ngAfterViewInit(): void {
    // Setup Agora video call buttons
    this.setupAgoraButtons();
  }

  ngOnDestroy(): void {
    // Clean up recorder and media stream
    if (this.activeSlot !== undefined) {
      this.stopRecordingForSlot(this.activeSlot);
    }
    this.leaveAllSlots();
  }

  /**
   * Toggles the questions panel visibility
   */
  toggleQuestionsPanel(): void {
    this.showQuestionsPanel = !this.showQuestionsPanel;
    if (this.showQuestionsPanel && this.role && this.company && this.selectedQuestions.length === 0) {
      this.loadQuestions();
    }
  }

  /**
   * Handles role input changes
   */
  onRoleInput(): void {
    this.roleInputSubject.next(this.role);
  }
  
  /**
   * Handles company input changes
   */
  onCompanyInput(): void {
    this.companyInputSubject.next(this.company);
  }

  /**
   * Checks if all required data is available and loads questions if it is
   */
  private checkAndLoadQuestions(): void {
    if (this.role && this.company) {
      this.loadQuestions();
    }
  }

  /**
   * Loads assessment centre style questions from the API
   */
  loadQuestions(): void {
    if (!this.role || !this.company) {
      this.errorMessage = 'Please enter both role and company to generate questions';
      return;
    }

    this.isLoadingQuestions = true;
    this.errorMessage = '';
    
    const data = {
      role: this.role,
      company: this.company,
      style: 'Assessment Centre'
    };

    console.log('Requesting questions with data:', data);

    this.apiService.getQuestions(data)
      .subscribe({
        next: (response) => {
          console.log('Questions received:', response);
          this.selectedQuestions = response.questions;
          
          // If we have questions, select the first one as current
          if (this.selectedQuestions.length > 0) {
            this.currentQuestion = this.selectedQuestions[0];
          }
          
          this.isLoadingQuestions = false;
        },
        error: (error) => {
          console.error('Error fetching questions:', error);
          this.errorMessage = 'Failed to load questions. Please try again.';
          this.selectedQuestions = [];
          this.isLoadingQuestions = false;
        }
      });
  }

  /**
   * Selects a question to display prominently
   * @param question The question to select
   */
  selectQuestion(question: string): void {
    this.currentQuestion = question;
    console.log('Selected question:', question);
  }

  /**
   * Adds a custom question created by the user
   */
  addCustomQuestion(): void {
    if (!this.customQuestion || this.customQuestion.trim() === '') {
      return;
    }

    // Format the custom question to match the style of generated questions
    const formattedQuestion = this.formatCustomQuestion(this.customQuestion);
    
    // Add to the questions list
    this.selectedQuestions.push(formattedQuestion);
    
    // Select the new question
    this.selectQuestion(formattedQuestion);
    
    // Clear the input
    this.customQuestion = '';
    
    console.log('Added custom question:', formattedQuestion);
  }
  
  /**
   * Formats a custom question to match the style of generated questions
   * @param question The raw question text
   * @returns Formatted question
   */
  private formatCustomQuestion(question: string): string {
    // Add formatting to make it look like the generated questions
    // First line is the question title, rest is description
    const lines = question.trim().split('\n');
    
    if (lines.length === 1) {
      // If only one line, treat it as a title and add a generic description
      return `<strong>${lines[0]}</strong>\n\nThis is a custom question created by the interviewer.`;
    } else {
      // If multiple lines, treat first as title and rest as description
      const title = lines[0];
      const description = lines.slice(1).join('\n');
      
      return `<strong>${title}</strong>\n\n${description}`;
    }
  }

  /**
   * Generates new assessment centre questions
   */
  generateNewQuestions(): void {
    this.loadQuestions();
  }

  /**
   * Leaves all participant slots in the assessment
   */
  leaveAllSlots(): void {
    if (this.activeSlot !== undefined) {
      this.leaveAndRemoveLocalStream();
    }
  }

  /**
   * Toggles the microphone for a specific participant
   * @param slotIndex The index of the slot to toggle microphone
   */
  toggleMic(slotIndex: number): void {
    if (!this.videoSlots[slotIndex].active || !this.videoSlots[slotIndex].stream) {
      return;
    }

    this.videoSlots[slotIndex].micMuted = !this.videoSlots[slotIndex].micMuted;

    // Update the audio tracks
    const audioTracks = this.videoSlots[slotIndex].stream.getAudioTracks();
    audioTracks.forEach(track => {
      track.enabled = !this.videoSlots[slotIndex].micMuted;
    });

    console.log(`Participant ${slotIndex + 1} microphone ${this.videoSlots[slotIndex].micMuted ? 'muted' : 'unmuted'}`);
  }

  /**
   * Toggles the camera for a specific participant
   * @param slotIndex The index of the slot to toggle camera
   */
  toggleCam(slotIndex: number): void {
    if (!this.videoSlots[slotIndex].active || !this.videoSlots[slotIndex].stream) {
      return;
    }

    this.videoSlots[slotIndex].camActive = !this.videoSlots[slotIndex].camActive;
    this.updateVideoTrackState(slotIndex);

    console.log(`Participant ${slotIndex + 1} camera ${this.videoSlots[slotIndex].camActive ? 'enabled' : 'disabled'}`);
  }

  /**
   * Toggles the microphone for all active participants
   */
  toggleGlobalMic(): void {
    this.globalMicMuted = !this.globalMicMuted;

    // Apply to all active slots
    this.videoSlots.forEach((slot, index) => {
      if (slot.active) {
        slot.micMuted = this.globalMicMuted;
        const audioTracks = slot.stream?.getAudioTracks() || [];
        audioTracks.forEach(track => {
          track.enabled = !slot.micMuted;
        });
      }
    });

    console.log(`Global microphone ${this.globalMicMuted ? 'muted' : 'unmuted'}`);
  }

  /**
   * Toggles the camera for all active participants
   */
  toggleGlobalCam(): void {
    this.globalCamActive = !this.globalCamActive;

    // If we have an active Agora slot, update it
    if (this.activeSlot !== undefined) {
      this.toggleCamera({ target: document.getElementById('camera-btn') } as any);
    }
    
    // Update traditional slots
    for (let i = 0; i < this.videoSlots.length; i++) {
      if (this.videoSlots[i].active) {
        this.videoSlots[i].camActive = this.globalCamActive;
        this.updateVideoTrackState(i);
      }
    }

    console.log(`Global camera ${this.globalCamActive ? 'enabled' : 'disabled'}`);
  }

  /**
   * Updates the video track state based on the camActive flag
   * @param slotIndex The index of the slot to update video track
   */
  private updateVideoTrackState(slotIndex: number): void {
    if (!this.videoSlots[slotIndex].stream) return;

    const videoTracks = this.videoSlots[slotIndex].stream.getVideoTracks();
    videoTracks.forEach(track => {
      track.enabled = this.videoSlots[slotIndex].camActive;
    });
  }

  /**
   * Gets the video element for a given slot index
   * @param slotIndex The index of the slot
   * @returns The ElementRef of the video element
   */
  private getVideoElement(slotIndex: number): ElementRef<HTMLVideoElement> | null {
    switch (slotIndex) {
      case 0: return this.videoElement1;
      case 1: return this.videoElement2;
      case 2: return this.videoElement3;
      case 3: return this.videoElement4;
      default: return null;
    }
  }

  /**
   * Opens the file selector to choose a video file
   */
  selectVideoFile(): void {
    this.fileInput.nativeElement.click();
  }

  /**
   * Handles file selection for the test video
   * @param event The file input change event
   */
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      
      // Check if the file is a video
      if (file.type.startsWith('video/')) {
        this.selectedVideoFile = file;
        console.log('Video file selected:', file.name);
        
        // Automatically load the selected video
        this.loadTestVideo();
      } else {
        alert('Please select a valid video file.');
        this.selectedVideoFile = null;
      }
    }
  }

  /**
   * Loads a test video into participant slot 2 for voice isolation testing
   */
  loadTestVideo(): void {
    // If slot is already active, leave it first
    if (this.videoSlots[1].active) {
      // Clear video slot without using the old leaveParticipantSlot method
      if (this.videoSlots[1].stream) {
        this.videoSlots[1].stream.getTracks().forEach(track => track.stop());
      }
      
      const videoElement = this.getVideoElement(1);
      if (videoElement && videoElement.nativeElement.srcObject) {
        videoElement.nativeElement.srcObject = null;
      }
      
      this.videoSlots[1] = {
        active: false,
        micMuted: true,
        camActive: true,
        isRecording: false
      };
    }
    
    const videoElement = this.getVideoElement(1);
    if (videoElement) {
      // If a file was selected, use that; otherwise use the default URL
      if (this.selectedVideoFile) {
        const objectUrl = URL.createObjectURL(this.selectedVideoFile);
        videoElement.nativeElement.src = objectUrl;
      } else {
        // Prompt user to select a file if none is selected
        this.selectVideoFile();
        return;
      }
      
      videoElement.nativeElement.muted = false; // Allow sound for testing
      
      // Set up event listeners
      videoElement.nativeElement.onloadeddata = () => {
        console.log('Test video loaded successfully');
        this.videoSlots[1].active = true;
        this.videoSlots[1].micMuted = false; // Unmute for voice isolation testing
        this.videoSlots[1].camActive = true;
        
        // Store the video file for later transcription
        this.videoSlots[1].videoBlob = this.selectedVideoFile as Blob;
      };
      
      videoElement.nativeElement.onerror = (e) => {
        console.error('Error loading test video:', e);
        alert('Could not load test video. Please try selecting a different file.');
        this.selectedVideoFile = null;
      };
      
      // Start playing the video
      videoElement.nativeElement.play().catch(error => {
        console.error('Error playing test video:', error);
        alert('Could not play test video. Browser may be blocking autoplay.');
      });
    }
  }

  /**
   * Starts the interview recording and transcription for all active participants
   */
  startInterview(): void {
    if (this.isRecording) return;
    
    this.isRecording = true;
    this.transcriptionActive = true;
    this.transcriptEntries = [];
    console.log('Interview recording started');

    // Reset audio recording data
    this.audioRecorders = {};
    this.audioChunks = {};
    this.audioBlobs = {};

    // Get the Agora audio track directly for more accurate recording
    if (this.agoraService.localTracks.length > 0) {
      const audioTrack = this.agoraService.localTracks[0];
      if (audioTrack) {
        console.log('Found Agora audio track:', audioTrack);
        // Create a stream from the Agora track
        const audioStream = new MediaStream([audioTrack.getMediaStreamTrack()]);
        this.startAudioRecording(0, audioStream);
        
        // Start real-time transcription for main participant
        this.startRealtimeTranscription(0, audioStream);
      } else {
        console.warn('No Agora audio track found in localTracks');
      }
    } else {
      console.warn('No Agora localTracks available');
    }

    // For each active video slot (other participants)
    this.videoSlots.forEach((slot, index) => {
      // Skip the main participant (index 0) as we handled it above
      if (index === 0) return;
      
      if (slot.active && slot.stream) {
        this.startRecordingForSlot(index);
        this.startAudioRecording(index, slot.stream);
        
        // Start real-time transcription for this participant
        this.startRealtimeTranscription(index, slot.stream);
      }
    });
  }

  /**
   * Stops the interview recording and transcription for all participants
   */
  stopInterview(): void {
    if (!this.isRecording) return;
    
    this.isRecording = false;
    this.transcriptionActive = false;
    console.log('Interview recording stopped');

    // Stop recording for each active slot
    this.videoSlots.forEach((slot, index) => {
      if (slot.isRecording) {
        this.stopRecordingForSlot(index);
      }
    });

    // Stop audio recording for all participants and process the audio
    Object.keys(this.audioRecorders).forEach(indexStr => {
      const index = parseInt(indexStr);
      this.stopAudioRecording(index);
    });

    // Stop any real-time transcription
    this.stopRealtimeTranscription();

    // Add immediate placeholder transcript while waiting for API processing
    if (Object.keys(this.audioBlobs).length > 0) {
      Object.keys(this.audioBlobs).forEach(indexStr => {
        const index = parseInt(indexStr);
        const blobSize = this.audioBlobs[index].size;
        if (!this.participantTranscripts[index] || this.participantTranscripts[index].trim() === '') {
          this.addParticipantTranscript(
            index, 
            `[Processing ${(blobSize / 1024).toFixed(1)}KB of audio... This may take a moment.]`
          );
        }
      });
    } else {
      this.addParticipantTranscript(0, "No audio data was recorded. Please ensure your microphone is enabled and try again.");
    }

    // Send audio to API for transcription
    this.processAudioRecordings();
  }

  /**
   * Starts recording for a specific participant slot
   * @param slotIndex The index of the slot to start recording
   */
  private startRecordingForSlot(slotIndex: number): void {
    const slot = this.videoSlots[slotIndex];
    if (!slot.active || !slot.stream || slot.isRecording) return;

    try {
      // Set up media recorder with the slot's stream
      const options = { mimeType: 'video/webm; codecs=vp9' };
      slot.recordedBlobs = [];
      slot.mediaRecorder = new MediaRecorder(slot.stream, options);
      
      // Handle data available event
      slot.mediaRecorder.ondataavailable = (event: BlobEvent) => {
        if (event.data && event.data.size > 0) {
          slot.recordedBlobs!.push(event.data);
        }
      };
      
      // Start recording
      slot.mediaRecorder.start(1000); // Collect data every second
      slot.isRecording = true;
      console.log(`Recording started for slot ${slotIndex + 1}`);
    } catch (error) {
      console.error(`Error starting recording for slot ${slotIndex + 1}:`, error);
    }
  }

  /**
   * Stops recording for a specific participant slot
   * @param slotIndex The index of the slot to stop recording
   */
  private stopRecordingForSlot(slotIndex: number): void {
    const slot = this.videoSlots[slotIndex];
    if (!slot.isRecording || !slot.mediaRecorder) return;

    try {
      // Stop the media recorder
      slot.mediaRecorder.stop();
      
      // Create a video blob from recorded chunks
      slot.videoBlob = new Blob(slot.recordedBlobs, { type: 'video/webm' });
      slot.isRecording = false;
      console.log(`Recording stopped for slot ${slotIndex + 1}`);
    } catch (error) {
      console.error(`Error stopping recording for slot ${slotIndex + 1}:`, error);
    }
  }

  /**
   * Starts audio recording for a specific participant
   * @param participantIndex The index of the participant
   * @param stream The media stream to record
   */
  private startAudioRecording(participantIndex: number, stream: MediaStream): void {
    try {
      // Extract only the audio track
      const audioTracks = stream.getAudioTracks();
      if (!audioTracks || audioTracks.length === 0) {
        console.warn(`No audio tracks available for participant ${participantIndex}`);
        return;
      }

      // Create a new MediaStream with only the audio track
      const audioStream = new MediaStream([audioTracks[0]]);
      
      // Initialize recorder with high quality audio
      const options = { 
        mimeType: 'audio/webm',
        audioBitsPerSecond: 128000 // Higher quality audio
      };
      const recorder = new MediaRecorder(audioStream, options);
      
      // Store start time for accurate duration calculation
      (recorder as any).startTime = Date.now();
      
      // Initialize storage for this participant
      this.audioChunks[participantIndex] = [];
      
      // Set up data handling
      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          this.audioChunks[participantIndex].push(event.data);
        }
      };
      
      // Start recording
      recorder.start(1000); // Collect data every second
      this.audioRecorders[participantIndex] = recorder;
      
      console.log(`Started audio recording for participant ${participantIndex}`);
    } catch (error) {
      console.error(`Error starting audio recording for participant ${participantIndex}:`, error);
    }
  }

  /**
   * Stops audio recording for a specific participant
   * @param participantIndex The index of the participant
   */
  private stopAudioRecording(participantIndex: number): void {
    if (!this.audioRecorders[participantIndex]) return;
    
    try {
      const recorder = this.audioRecorders[participantIndex];
      
      // Store stop time for accurate duration calculation
      (recorder as any).stopTime = Date.now();
      
      // Define what happens when recording stops
      recorder.onstop = () => {
        console.log(`Audio recording stopped for participant ${participantIndex}`);
        
        // Create a blob from the recorded chunks
        if (this.audioChunks[participantIndex] && this.audioChunks[participantIndex].length > 0) {
          const audioBlob = new Blob(this.audioChunks[participantIndex], { type: 'audio/webm' });
          this.audioBlobs[participantIndex] = audioBlob;
          
          console.log(`Audio blob created for participant ${participantIndex}, size: ${audioBlob.size} bytes`);
          
          // Immediately create a simple transcript from the audio for immediate feedback
          this.createSimpleTranscript(participantIndex, audioBlob);
        } else {
          console.warn(`No audio chunks available for participant ${participantIndex}`);
        }
      };
      
      // Stop the recorder
      recorder.stop();
    } catch (error) {
      console.error(`Error stopping audio recording for participant ${participantIndex}:`, error);
    }
  }

  /**
   * Creates a simple transcript from audio directly in the browser
   * This provides immediate feedback while waiting for server transcription
   * @param participantIndex The index of the participant
   * @param audioBlob The audio blob to analyze
   */
  private createSimpleTranscript(participantIndex: number, audioBlob: Blob): void {
    // Get more accurate recording duration based on recorder stats
    const recorder = this.audioRecorders[participantIndex];
    let estimatedDuration = 0;
    
    if (recorder) {
      // Calculate actual recording duration in seconds
      const startTime = (recorder as any).startTime || 0;
      const endTime = (recorder as any).stopTime || Date.now();
      estimatedDuration = Math.round((endTime - startTime) / 1000);
      console.log(`Actual recording duration for participant ${participantIndex}: ${estimatedDuration} seconds`);
    } else {
      // Fall back to blob size estimation if recorder info not available
      estimatedDuration = Math.round(audioBlob.size / 16000); // Adjusted for higher quality audio
      console.log(`Estimated recording duration based on size for participant ${participantIndex}: ${estimatedDuration} seconds`);
    }
    
    // Check if the duration is reasonable
    if (estimatedDuration < 1) {
      this.addParticipantTranscript(participantIndex, "Very short audio detected. Speech may not be audible.");
      return;
    }
    
    // Calculate estimated words based on average speaking rate
    const avgWordsPerSecond = 2.5; // Average speaking rate
    const estimatedWords = Math.round(estimatedDuration * avgWordsPerSecond);
    
    // Add a client-side placeholder transcript
    const participantName = this.participantNames[participantIndex] || `Participant ${participantIndex + 1}`;
    this.addParticipantTranscript(
      participantIndex, 
      `[${participantName} spoke for approximately ${estimatedDuration} seconds (~${estimatedWords} words). Audio captured successfully.]`
    );
    
    // Try to create an audio player for review
    try {
      const audioUrl = URL.createObjectURL(audioBlob);
      console.log(`Created audio URL for participant ${participantIndex}: ${audioUrl}`);
      
      // Add an audio player element that's visible for verification
      if (!document.getElementById(`audio-player-${participantIndex}`)) {
        const audioContainer = document.createElement('div');
        audioContainer.id = `audio-container-${participantIndex}`;
        audioContainer.style.margin = '10px 0';
        
        const label = document.createElement('p');
        label.textContent = `${participantName} Recording:`;
        label.style.margin = '5px 0';
        audioContainer.appendChild(label);
        
        const audioElement = document.createElement('audio');
        audioElement.id = `audio-player-${participantIndex}`;
        audioElement.controls = true;
        audioElement.src = audioUrl;
        audioContainer.appendChild(audioElement);
        
        // Find the transcript container to add the audio player
        const transcriptContainer = document.querySelector('.combined-transcript-section');
        if (transcriptContainer) {
          transcriptContainer.appendChild(audioContainer);
        } else {
          // Fallback to body if transcript container not found
          document.body.appendChild(audioContainer);
        }
        
        console.log(`Added audio player for participant ${participantIndex}`);
      }
    } catch (error) {
      console.error(`Error creating audio player for participant ${participantIndex}:`, error);
    }
  }

  /**
   * Processes all audio recordings and sends them to the API for transcription
   */
  private processAudioRecordings(): void {
    // Set loading state for transcripts
    this.videoSlots.forEach(slot => {
      slot.loadingTranscript = true;
    });
    
    // Track completion of all transcription requests
    const participantCount = Object.keys(this.audioBlobs).length;
    let completedCount = 0;
    
    console.log(`Found ${participantCount} audio recordings to process:`, Object.keys(this.audioBlobs));
    
    // Debug audio blobs
    Object.keys(this.audioBlobs).forEach(indexStr => {
      const participantIndex = parseInt(indexStr);
      const audioBlob = this.audioBlobs[participantIndex];
      console.log(`Audio for participant ${participantIndex}:`, {
        size: audioBlob.size,
        type: audioBlob.type
      });
    });
    
    // If no audio blobs were recorded, show a message and stop here
    if (participantCount === 0) {
      console.warn("No audio blobs found to process");
      this.addParticipantTranscript(0, "No audio was recorded during the interview. Please check your microphone.");
      this.videoSlots.forEach(slot => {
        slot.loadingTranscript = false;
      });
      return;
    }
    
    // Process each participant's audio
    Object.keys(this.audioBlobs).forEach(indexStr => {
      const participantIndex = parseInt(indexStr);
      const audioBlob = this.audioBlobs[participantIndex];
      
      console.log(`Processing audio for participant ${participantIndex}, blob size: ${audioBlob.size} bytes`);
      
      // If the audio blob is too small, it's likely empty
      if (audioBlob.size < 1000) {
        console.warn(`Audio blob for participant ${participantIndex} is too small (${audioBlob.size} bytes), skipping transcription`);
        this.addParticipantTranscript(participantIndex, "No audible speech detected.");
        completedCount++;
        return;
      }
      
      // Create a form data object to send the audio
      const formData = new FormData();
      formData.append('file', audioBlob, `participant_${participantIndex}_audio.webm`);
      formData.append('participantIndex', participantIndex.toString());
      formData.append('participantName', this.participantNames[participantIndex] || `Participant ${participantIndex + 1}`);
      
      // Set up timeout to handle long-running transcription
      const transcriptionTimeout = setTimeout(() => {
        console.log(`Transcription timeout for participant ${participantIndex}, using fallback method`);
        
        // Use the participant transcript if we have one from real-time recognition
        if (this.participantTranscripts[participantIndex] && this.participantTranscripts[participantIndex].trim() !== '') {
          this.addParticipantTranscript(
            participantIndex, 
            `${this.participantNames[participantIndex] || `Participant ${participantIndex + 1}`}: ${this.participantTranscripts[participantIndex]}`
          );
        } else {
          // Fall back to duration-based message
          this.addParticipantTranscript(
            participantIndex, 
            `${this.participantNames[participantIndex] || `Participant ${participantIndex + 1}`} spoke for approximately ${Math.round(audioBlob.size / 16000)} seconds (~${Math.round(Math.round(audioBlob.size / 16000) * 2.5)} words). Audio captured successfully but transcription timed out.`
          );
        }
        
        // Still save the audio for later processing
        this.saveAudioLocally(participantIndex, audioBlob);
        
        // Update completion count
        if (participantIndex in this.videoSlots) {
          this.videoSlots[participantIndex].loadingTranscript = false;
        }
      }, 30000); // 30 second timeout
      
      // Send to the server for transcription
      this.apiService.uploadAudioForTranscription(formData).subscribe({
        next: (response) => {
          // Clear timeout since we got a response
          clearTimeout(transcriptionTimeout);
          
          console.log(`Transcription received for participant ${participantIndex}:`, response);
          
          if (response && response.transcript) {
            // Update transcript UI
            this.addParticipantTranscript(participantIndex, response.transcript);
          } else {
            console.warn(`No transcript data in response for participant ${participantIndex}`);
            
            // Use any real-time transcript we collected as a fallback
            if (this.participantTranscripts[participantIndex] && this.participantTranscripts[participantIndex].trim() !== '') {
              this.addParticipantTranscript(
                participantIndex, 
                `${this.participantNames[participantIndex] || `Participant ${participantIndex + 1}`}: ${this.participantTranscripts[participantIndex]}`
              );
            } else {
              this.addParticipantTranscript(participantIndex, "No transcript available from server. Speech was recorded for the interview.");
            }
          }
          
          // Mark as completed
          completedCount++;
          
          // Update loading state
          if (participantIndex in this.videoSlots) {
            this.videoSlots[participantIndex].loadingTranscript = false;
          }
          
          // If all participants are processed, mark as complete
          if (completedCount >= participantCount) {
            this.videoSlots.forEach(slot => {
              slot.loadingTranscript = false;
            });
          }
        },
        error: (error) => {
          // Clear timeout since we got a response (albeit an error)
          clearTimeout(transcriptionTimeout);
          
          console.error(`Error transcribing audio for participant ${participantIndex}:`, error);
          
          // Use any real-time transcript we collected as a fallback
          if (this.participantTranscripts[participantIndex] && this.participantTranscripts[participantIndex].trim() !== '') {
            this.addParticipantTranscript(
              participantIndex, 
              `${this.participantNames[participantIndex] || `Participant ${participantIndex + 1}`}: ${this.participantTranscripts[participantIndex]}`
            );
          } else {
            // Add error message to transcript
            this.addParticipantTranscript(participantIndex, "Error generating transcript. Speech was recorded for the interview.");
          }
          
          // Save the audio locally for potential recovery
          this.saveAudioLocally(participantIndex, audioBlob);
          
          // Mark as completed even on error
          completedCount++;
          
          // Update loading state
          if (participantIndex in this.videoSlots) {
            this.videoSlots[participantIndex].loadingTranscript = false;
          }
          
          // If all participants are processed, mark as complete
          if (completedCount >= participantCount) {
            this.videoSlots.forEach(slot => {
              slot.loadingTranscript = false;
            });
          }
        }
      });
    });
    
    // If no audio blobs were processed, show a message
    if (participantCount === 0) {
      this.addParticipantTranscript(0, "No audio was recorded during the interview.");
      this.videoSlots.forEach(slot => {
        slot.loadingTranscript = false;
      });
    }
  }

  /**
   * Saves audio blob locally for potential recovery
   * @param participantIndex The index of the participant
   * @param audioBlob The audio blob to save
   */
  private saveAudioLocally(participantIndex: number, audioBlob: Blob): void {
    try {
      // Store in local storage (metadata only)
      const metadata = {
        participantIndex,
        timestamp: new Date().toISOString(),
        blobSize: audioBlob.size
      };
      localStorage.setItem(`audio_metadata_${participantIndex}`, JSON.stringify(metadata));
      
      // Create an object URL for the blob to allow playback
      const url = URL.createObjectURL(audioBlob);
      console.log(`Audio saved locally for participant ${participantIndex}, URL: ${url}`);
      
      // Add a note to the transcript about local storage
      this.addParticipantTranscript(participantIndex, "Note: Audio has been temporarily saved locally for processing. It will be included in the saved interview.");
    } catch (error) {
      console.error(`Error saving audio locally for participant ${participantIndex}:`, error);
    }
  }

  /**
   * Adds a participant's transcript to the transcript entries
   * @param participantIndex The index of the participant
   * @param transcript The transcript text
   */
  private addParticipantTranscript(participantIndex: number, transcript: string): void {
    // Add to transcript entries
    this.transcriptEntries.push({
      participantIndex: participantIndex,
      text: transcript,
      timestamp: new Date()
    });
    
    // Sort entries by timestamp
    this.transcriptEntries.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
    
    console.log('Updated transcript entries:', this.transcriptEntries);
  }

  /**
   * Starts real-time transcription for a participant
   * @param participantIndex The index of the participant
   * @param stream The media stream to transcribe
   */
  private startRealtimeTranscription(participantIndex: number, stream: MediaStream): void {
    if (!('webkitSpeechRecognition' in window)) {
      console.warn('Speech Recognition API not supported in this browser');
      return;
    }

    try {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      // Configure speech recognition
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      
      // Initialize transcript for this participant
      if (!this.participantTranscripts[participantIndex]) {
        this.participantTranscripts[participantIndex] = '';
      }
      
      // Handle results
      recognition.onresult = (event: any) => {
        if (!this.transcriptionActive) return;
        
        let interimTranscript = '';
        let finalTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
            
            // Add to transcript entries with timestamp
            this.addParticipantTranscript(participantIndex, transcript);
          } else {
            interimTranscript += transcript;
          }
        }
        
        // Update real-time display for interim results
        if (interimTranscript) {
          this.updateInterimTranscript(participantIndex, interimTranscript);
        }
      };
      
      // Handle errors
      recognition.onerror = (event: any) => {
        console.error(`Speech recognition error for participant ${participantIndex}:`, event.error);
      };
      
      // Start recognition
      recognition.start();
      console.log(`Real-time transcription started for participant ${participantIndex}`);
      
      // Store the recognition instance so we can stop it later
      (this as any)[`recognition_${participantIndex}`] = recognition;
    } catch (error) {
      console.error(`Error starting real-time transcription for participant ${participantIndex}:`, error);
    }
  }

  /**
   * Stops real-time transcription for all participants
   */
  private stopRealtimeTranscription(): void {
    // Find all recognition instances and stop them
    for (const key in this) {
      if (key.startsWith('recognition_')) {
        try {
          const recognition = (this as any)[key];
          if (recognition) {
            recognition.stop();
            console.log(`Stopped real-time transcription for ${key}`);
          }
        } catch (error) {
          console.error(`Error stopping real-time transcription for ${key}:`, error);
        }
      }
    }
  }

  /**
   * Updates the interim (in-progress) transcript for a participant
   * @param participantIndex The index of the participant
   * @param interimText The interim transcript text
   */
  private updateInterimTranscript(participantIndex: number, interimText: string): void {
    const participantName = this.participantNames[participantIndex] || `Participant ${participantIndex + 1}`;
    
    // Find or create an interim element for this participant
    let interimElement = document.getElementById(`interim-transcript-${participantIndex}`);
    if (!interimElement) {
      interimElement = document.createElement('div');
      interimElement.id = `interim-transcript-${participantIndex}`;
      interimElement.className = 'interim-transcript';
      interimElement.style.color = '#888';
      interimElement.style.fontStyle = 'italic';
      interimElement.style.margin = '10px 0';
      
      // Find the transcript container to add the interim element
      const transcriptContainer = document.querySelector('.combined-transcript');
      if (transcriptContainer) {
        transcriptContainer.appendChild(interimElement);
      } else {
        // Find a more general container if the specific one isn't available
        const generalContainer = document.querySelector('.transcript-content') || 
                                document.querySelector('.combined-transcript-section');
        if (generalContainer) {
          generalContainer.appendChild(interimElement);
        }
      }
    }
    
    // Update the interim transcript
    interimElement.textContent = `${participantName} (typing...): ${interimText}`;
  }

  /**
   * Processes all transcripts and prepares the final combined transcript
   */
  private processAllTranscripts(): void {
    // Sort transcript entries by timestamp
    this.transcriptEntries.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
    
    // Log the final transcript for debugging
    console.log('Final combined transcript:', this.transcriptEntries);
  }

  /**
   * Gets the combined transcript from all participants in chronological order
   * @returns Array of transcript entries sorted by timestamp
   */
  getCombinedTranscript(): TranscriptEntry[] {
    return [...this.transcriptEntries].sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  }

  /**
   * Checks if any transcript is available
   * @returns Boolean indicating if any participant has a transcript
   */
  isAnyTranscriptAvailable(): boolean {
    return this.transcriptEntries.length > 0;
  }

  /**
   * Checks if any transcript is currently loading
   * @returns Boolean indicating if any participant's transcript is loading
   */
  isLoadingAnyTranscript(): boolean {
    return this.videoSlots.some(slot => slot.loadingTranscript);
  }

  /**
   * Saves all interview transcripts to the backend
   */
  saveAllInterviews(): void {
    if (this.isSaving || !this.isAnyTranscriptAvailable()) return;
    
    this.isSaving = true;
    this.saveError = '';
    this.saveSuccess = false;
    
    // Prepare combined transcript text
    const combinedTranscript = this.transcriptEntries
      .map(entry => `Participant ${entry.participantIndex + 1}: ${entry.text}`)
      .join('\n');
    
    // Save to backend
    this.apiService.saveInterview({
      role: this.role || 'General Assessment',
      company: this.company || 'General Company',
      style: 'assessment-centre',
      question: this.currentQuestion || 'Assessment Centre Interview',
      transcript: combinedTranscript
    }).subscribe({
      next: (response) => {
        console.log('Interview saved successfully:', response);
        this.isSaving = false;
        this.saveSuccess = true;
        setTimeout(() => this.saveSuccess = false, 3000);
      },
      error: (error) => {
        console.error('Error saving interview:', error);
        this.isSaving = false;
        this.saveError = 'Failed to save interview. Please try again.';
      }
    });
  }

  /**
   * Gets the participant count
   * @returns The number of active participants
   */
  get participantCount(): number {
    return this.videoSlots.filter(slot => slot.active).length;
  }

  /**
   * Checks the API status for debugging purposes
   */
  checkApiStatus(): void {
    console.log('Checking API status...');
    
    this.apiService.checkApiStatus()
      .subscribe({
        next: (response) => {
          console.log('API Status:', response);
          alert(`API Status: ${JSON.stringify(response, null, 2)}`);
        },
        error: (error) => {
          console.error('Error checking API status:', error);
          alert(`API Status Error: ${error.message}`);
        }
      });
  }

  /**
   * Format the assessment task for HTML display
   * @param task The assessment task to format
   * @returns The formatted task with HTML
   */
  formatAssessmentTask(task: string): string {
    if (!task) return '';

    // Safety check - sanitize the task text
    const sanitizedTask = task.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    
    // Split by Scenario and Instructions sections
    let formattedHtml = '';
    
    if (sanitizedTask.includes('Scenario:') && sanitizedTask.includes('Instructions:')) {
      const scenarioParts = sanitizedTask.split('Instructions:');
      const scenarioText = scenarioParts[0].replace('Scenario:', '<h3>Scenario:</h3>');
      const instructionsText = '<h3>Instructions:</h3>' + scenarioParts[1];
      
      // Apply some basic formatting to the sections
      formattedHtml = scenarioText + instructionsText;
      
      // Convert newlines to <br> for proper HTML display
      formattedHtml = formattedHtml.replace(/\n/g, '<br>');
      
      // Add some extra spacing between paragraphs
      formattedHtml = formattedHtml.replace(/<br><br>/g, '<br><br>');
    } else {
      // Fallback for non-standard format
      formattedHtml = sanitizedTask.replace(/\n/g, '<br>');
    }
    
    return formattedHtml;
  }

  // Video Call Implementation
  
  /**
   * Setup video call - initialize event handlers
   */
  private setupVideoCall(): void {
    // Subscribe to connection state changes for debugging
    this.agoraService.connectionState$.subscribe(state => {
      console.log('Agora connection state:', state);
    });
  }

  /**
   * Setup Agora button event listeners
   */
  private setupAgoraButtons(): void {
    // Join button
    const joinBtn = document.getElementById('join-btn');
    if (joinBtn) {
      joinBtn.addEventListener('click', this.joinStream.bind(this));
    }
    
    // Leave button
    const leaveBtn = document.getElementById('leave-btn');
    if (leaveBtn) {
      leaveBtn.addEventListener('click', this.leaveAndRemoveLocalStream.bind(this));
    }
    
    // Mic button
    const micBtn = document.getElementById('mic-btn');
    if (micBtn) {
      micBtn.addEventListener('click', this.toggleMicAgora.bind(this));
    }
    
    // Camera button
    const cameraBtn = document.getElementById('camera-btn');
    if (cameraBtn) {
      cameraBtn.addEventListener('click', this.toggleCamera.bind(this));
    }
  }

  /**
   * Join and display local stream
   */
  private async joinStream(): Promise<void> {
    try {
      // Hide join button, show controls
      const joinBtn = document.getElementById('join-btn');
      const streamControls = document.getElementById('stream-controls');
      
      if (joinBtn) joinBtn.style.display = 'none';
      if (streamControls) streamControls.style.display = 'flex';
      
      // Clear any existing streams first
      const videoStreams = document.getElementById('video-streams');
      if (videoStreams) {
        videoStreams.innerHTML = '';
        
        // Create container box for local user
        const localUserHTML = `
          <div class="video-container local-user" id="local-user-container">
            <div class="video-player" id="local-user-video"></div>
            <div class="participant-label">YOU</div>
          </div>
        `;
        videoStreams.insertAdjacentHTML('beforeend', localUserHTML);
        
        // Create containers for remote users
        for (let i = 1; i <= 3; i++) {
          const remoteUserHTML = `
            <div class="video-container" id="participant-container-${i}">
              <div class="video-player" id="remote-user-${i}"></div>
              <div class="participant-label">Participant ${i}</div>
            </div>
          `;
          videoStreams.insertAdjacentHTML('beforeend', remoteUserHTML);
        }
        
        // Make sure the grid layout is correct
        const containerStyle = videoStreams.style;
        containerStyle.display = 'grid';
        containerStyle.gridTemplateColumns = 'repeat(2, 1fr)';
        containerStyle.gridTemplateRows = 'repeat(2, 1fr)';
        containerStyle.gap = '10px';
        containerStyle.width = '500px';
        containerStyle.margin = '20px auto';
        
        // Join and display local stream
        try {
          await this.agoraService.joinAndDisplayLocalStream('local-user-video');
          console.log('Successfully joined and displayed local stream');
          
          // Extra styling for video containers to make sure they're sized correctly
          document.querySelectorAll('.video-container').forEach(container => {
            const el = container as HTMLElement;
            el.style.width = '240px';
            el.style.height = '180px';
            el.style.overflow = 'hidden';
            el.style.position = 'relative';
            el.style.display = 'block';
          });
          
          // Style the video players too
          document.querySelectorAll('.video-player').forEach(player => {
            const el = player as HTMLElement;
            el.style.width = '100%';
            el.style.height = '100%';
            el.style.overflow = 'hidden';
            el.style.position = 'relative';
          });
        } catch (error) {
          console.error('Error displaying local stream:', error);
        }
      }
    } catch (error) {
      console.error('Error joining stream:', error);
      
      // If something goes wrong, restore the join button
      const joinBtn = document.getElementById('join-btn');
      const streamControls = document.getElementById('stream-controls');
      
      if (joinBtn) joinBtn.style.display = 'block';
      if (streamControls) streamControls.style.display = 'none';
    }
  }

  /**
   * Leave and remove local stream
   */
  private async leaveAndRemoveLocalStream(): Promise<void> {
    try {
      // Leave channel and remove local stream
      await this.agoraService.leaveAndRemoveLocalStream();
      
      // Show join button, hide controls
      const joinBtn = document.getElementById('join-btn');
      const streamControls = document.getElementById('stream-controls');
      
      if (joinBtn) joinBtn.style.display = 'block';
      if (streamControls) streamControls.style.display = 'none';
      
      // Clear video streams
      const videoStreams = document.getElementById('video-streams');
      if (videoStreams) videoStreams.innerHTML = '';
      
      // Reset button states
      const micBtn = document.getElementById('mic-btn');
      const cameraBtn = document.getElementById('camera-btn');
      
      if (micBtn) {
        micBtn.innerText = 'Mic on';
        micBtn.style.backgroundColor = 'cadetblue';
        micBtn.classList.remove('off');
      }
      
      if (cameraBtn) {
        cameraBtn.innerText = 'Camera on';
        cameraBtn.style.backgroundColor = 'cadetblue';
        cameraBtn.classList.remove('off');
      }
      
      console.log('Successfully left the stream');
    } catch (error) {
      console.error('Error leaving stream:', error);
    }
  }

  /**
   * Toggle microphone for Agora
   */
  private async toggleMicAgora(e: Event): Promise<void> {
    try {
      const target = e.target as HTMLButtonElement;
      const isMuted = await this.agoraService.toggleMic();
      
      if (isMuted) {
        target.innerText = 'Mic off';
        target.style.backgroundColor = '#EE4B2B';
        target.classList.add('off');
      } else {
        target.innerText = 'Mic on';
        target.style.backgroundColor = 'cadetblue';
        target.classList.remove('off');
      }
    } catch (error) {
      console.error('Error toggling mic:', error);
    }
  }

  /**
   * Toggle camera
   */
  private async toggleCamera(e: Event): Promise<void> {
    try {
      const target = e.target as HTMLButtonElement;
      const isMuted = await this.agoraService.toggleCamera();
      
      if (isMuted) {
        target.innerText = 'Camera off';
        target.style.backgroundColor = '#EE4B2B';
        target.classList.add('off');
      } else {
        target.innerText = 'Camera on';
        target.style.backgroundColor = 'cadetblue';
        target.classList.remove('off');
      }
    } catch (error) {
      console.error('Error toggling camera:', error);
    }
  }
}
