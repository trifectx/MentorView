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
import { AssessmentCentreService, AssessmentCentreFeedback } from '../../services/assessment-centre.service';
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
  styleUrls: ['./assessment-centre.component.css', './assessment-centre.component-feedback.css'],
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
  
  // Client-side transcripts
  participantTranscripts: { [participantIndex: number]: string } = {};
  participantInterimTranscripts: { [participantIndex: number]: string } = {};
  participantAudioDurations: { [participantIndex: number]: number } = {};
  isTranscribing = false;
  
  // Audio URL storage (without creating DOM elements)
  audioUrls: { [participantIndex: number]: string } = {};
  audioRecorders: { [key: number]: MediaRecorder } = {};
  audioChunks: { [key: number]: Blob[] } = {};
  audioBlobs: { [key: number]: Blob } = {};

  // Participant feedback related properties
  participantFeedback: { [participantIndex: number]: AssessmentCentreFeedback } = {};
  isGeneratingFeedback: { [participantIndex: number]: boolean } = {};
  feedbackGenerationError: { [participantIndex: number]: string } = {};
  
  participantNames: { [participantIndex: number]: string } = {
    0: 'Main Participant',
    1: 'Remote Participant 1',
    2: 'Remote Participant 2',
    3: 'Remote Participant 3',
    4: 'Remote Participant 4'
  };

  // Store recognition instances for each participant
  speechRecognitionInstances: { [participantIndex: number]: any } = {};

  // Combined transcript from server processing
  combinedTranscript: Array<{ participantIndex: number, text: string }> = [];

  connectionState: 'IDLE' | 'CONNECTING' | 'CONNECTED' = 'IDLE';
  isAudioEnabled = true;
  isVideoEnabled = true;
  isJoining = false;
  messages: { sender: string; message: string }[] = [];
  newMessage = '';

  activeSlot?: number;

  savedTranscripts: { [participantIndex: number]: string } = {};

  constructor(
    private apiService: ApiService, 
    private agoraService: AgoraService,
    private assessmentCentreService: AssessmentCentreService
  ) {
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
    
    // Reset all transcript data
    this.transcriptEntries = [];
    this.combinedTranscript = [];
    this.participantTranscripts = {};
    this.participantInterimTranscripts = {};
    
    // Clear saved transcripts to ensure fresh data
    this.savedTranscripts = {};
    
    // Also clear localStorage for clean state
    this.clearSavedTranscripts();
    
    console.log('Interview recording started and transcript data cleared');

    // Reset audio recording data
    this.audioRecorders = {};
    this.audioChunks = {};
    this.audioBlobs = {};

    // Get the Agora audio track directly for more accurate recording of local user
    if (this.agoraService.localTracks.length > 0) {
      const audioTrack = this.agoraService.localTracks[0];
      if (audioTrack) {
        console.log('Found Agora audio track for local user:', audioTrack);
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

    // Process remote users from Agora
    this.processRemoteAgoraUsers();

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

    // Set up remote user tracking
    this.setupRemoteUserTracking();
  }

  /**
   * Process remote users from the Agora service
   */
  private processRemoteAgoraUsers(): void {
    // Get remote users from Agora service
    const remoteUsers = this.agoraService.remoteUsers;
    if (!remoteUsers || Object.keys(remoteUsers).length === 0) {
      console.log('No remote Agora users found');
      return;
    }

    console.log('Processing remote Agora users:', remoteUsers);
    
    // Process each remote user
    Object.keys(remoteUsers).forEach((uid, index) => {
      const remoteUser = remoteUsers[uid];
      const participantIndex = index + 1; // Remote users start at index 1
      
      if (remoteUser && remoteUser.audioTrack) {
        console.log(`Found audio track for remote user ${uid} (Participant ${participantIndex})`);
        
        try {
          // Get the MediaStreamTrack from the Agora audio track
          const mediaStreamTrack = remoteUser.audioTrack.getMediaStreamTrack();
          if (mediaStreamTrack) {
            // Create a MediaStream from the track
            const audioStream = new MediaStream([mediaStreamTrack]);
            
            // Start recording and transcription for this remote user
            this.startAudioRecording(participantIndex, audioStream);
            this.startRealtimeTranscription(participantIndex, audioStream);
            
            console.log(`Started recording and transcription for remote user ${uid} (Participant ${participantIndex})`);
          } else {
            console.warn(`No MediaStreamTrack available for remote user ${uid}`);
          }
        } catch (error) {
          console.error(`Error processing audio for remote user ${uid}:`, error);
        }
      } else {
        console.warn(`No audio track found for remote user ${uid}`);
      }
    });
  }

  /**
   * Set up event listeners to track new remote users who join
   */
  private setupRemoteUserTracking(): void {
    // Only set up listeners if we're recording
    if (!this.isRecording) return;
    
    // Set up a listener for new users
    this.agoraService.client.on('user-published', (user: any, mediaType: string) => {
      if (!this.isRecording) return;
      
      console.log(`New user published during recording: ${user.uid}, mediaType: ${mediaType}`);
      
      // If this is audio, add this user to recording
      if (mediaType === 'audio') {
        // Find an available participant index
        let participantIndex = Object.keys(this.audioRecorders).length + 1;
        if (participantIndex > 4) participantIndex = 4; // Maximum 4 participants
        
        // Wait a moment for the track to be available
        setTimeout(() => {
          try {
            // Get the updated user from remote users (should have subscribed by now)
            const remoteUser = this.agoraService.remoteUsers[user.uid];
            if (remoteUser && remoteUser.audioTrack) {
              const mediaStreamTrack = remoteUser.audioTrack.getMediaStreamTrack();
              if (mediaStreamTrack) {
                const audioStream = new MediaStream([mediaStreamTrack]);
                
                // Start recording and transcription for this new user
                this.startAudioRecording(participantIndex, audioStream);
                this.startRealtimeTranscription(participantIndex, audioStream);
                
                console.log(`Started recording for new user ${user.uid} (Participant ${participantIndex})`);
              }
            }
          } catch (error) {
            console.error(`Error setting up recording for new user ${user.uid}:`, error);
          }
        }, 2000); // Wait 2 seconds for the track to be ready
      }
    });
    
    // Set up a listener for users who leave
    this.agoraService.client.on('user-left', (user: any) => {
      console.log(`User left during recording: ${user.uid}`);
      // We don't stop recording when a user leaves, just note it
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
          
          // Store audio URL for functionality but don't create visible DOM elements
          const audioUrl = URL.createObjectURL(audioBlob);
          this.audioUrls = this.audioUrls || {};
          this.audioUrls[participantIndex] = audioUrl;
          
          // Process the audio for transcription
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
    
    // Calculate estimated words based on average speaking rate
    const avgWordsPerSecond = 2.5; // Average speaking rate
    const estimatedWords = Math.round(estimatedDuration * avgWordsPerSecond);
    
    // Add a client-side placeholder transcript
    const participantName = this.participantNames[participantIndex] || `Participant ${participantIndex + 1}`;
    this.addParticipantTranscript(
      participantIndex, 
      `[${participantName} spoke for approximately ${estimatedDuration} seconds (~${estimatedWords} words). Processing audio...]`
    );
    
    // Create audio URL without creating visible DOM elements
    try {
      // Just store the URL in memory for audio processing
      const audioUrl = URL.createObjectURL(audioBlob);
      this.audioUrls = this.audioUrls || {};
      this.audioUrls[participantIndex] = audioUrl;
      
      // Ensure the audio blob is available for server-side transcription
      console.log(`Audio ready for transcription for participant ${participantIndex}`);
    } catch (error) {
      console.error(`Error processing audio for participant ${participantIndex}:`, error);
    }
  }
  
  /**
   * Creates a hidden audio player to facilitate transcription while keeping it invisible
   * This allows transcript functionality to work without displaying audio players
   * @param participantIndex The index of the participant
   * @param audioBlob The audio blob to use
   */
  private createHiddenAudioPlayer(participantIndex: number, audioBlob: Blob): void {
    try {
      // Create URL for the audio blob
      const audioUrl = URL.createObjectURL(audioBlob);
      
      // Store the URL in our map for future reference
      this.audioUrls = this.audioUrls || {};
      this.audioUrls[participantIndex] = audioUrl;
      
      // Find the container for this participant
      const containerId = `audio-container-${participantIndex}`;
      const container = document.getElementById(containerId);
      
      // Skip if no container was found
      if (!container) {
        console.log(`Audio container ${containerId} not found, skipping player creation`);
        return;
      }
      
      // Clear any existing content
      container.innerHTML = '';
      
      // Create audio element (but it will be hidden by CSS)
      const audioElement = document.createElement('audio');
      audioElement.controls = true;
      audioElement.src = audioUrl;
      audioElement.style.display = 'none'; // Hide it completely
      
      // Append the audio element to the container
      container.appendChild(audioElement);
      
      console.log(`Hidden audio player created for participant ${participantIndex}`);
    } catch (error) {
      console.error(`Error creating hidden audio player for participant ${participantIndex}:`, error);
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
    
    // Log participants being processed
    console.log("Processing transcriptions for participants:", Object.keys(this.audioBlobs));
    
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
        type: audioBlob.type,
        participantName: this.participantNames[participantIndex] || `Participant ${participantIndex + 1}`
      });
      
      // Create audio players but keep them hidden for transcript functionality
      this.createHiddenAudioPlayer(participantIndex, audioBlob);
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
    
    // Process each participant's audio - PRIORITY ORDER
    // Process participant 2 first, then main participant, then others
    const processingOrder = Object.keys(this.audioBlobs).sort((a, b) => {
      // Put participant 2 first
      if (a === '1') return -1;
      if (b === '1') return 1;
      // Put main participant (0) second
      if (a === '0') return -1;
      if (b === '0') return 1;
      // Natural order for others
      return parseInt(a) - parseInt(b);
    });
    
    console.log("Processing participants in order:", processingOrder);
    
    // Process each participant's audio in priority order
    processingOrder.forEach(indexStr => {
      const participantIndex = parseInt(indexStr);
      const audioBlob = this.audioBlobs[participantIndex];
      
      console.log(`Starting transcription for participant ${participantIndex} (${this.participantNames[participantIndex] || `Participant ${participantIndex + 1}`})`);
      
      // Skip empty audio
      if (!audioBlob || audioBlob.size < 1000) {
        console.warn(`Audio blob for participant ${participantIndex} is too small (${audioBlob?.size || 0} bytes), skipping transcription`);
        this.addParticipantTranscript(participantIndex, "No audible speech detected.");
        completedCount++;
        
        // Update completion status
        if (participantIndex in this.videoSlots) {
          this.videoSlots[participantIndex].loadingTranscript = false;
        }
        
        return;
      }
      
      // Display processing state
      this.addParticipantTranscript(
        participantIndex, 
        "Processing audio with OpenAI GPT for high-quality transcription..."
      );
      
      // Process this participant using our transcription service
      this.processParticipantAudio(participantIndex, audioBlob, () => {
        completedCount++;
        
        // If all participants are processed, mark as complete
        if (completedCount >= participantCount) {
          this.videoSlots.forEach(slot => {
            slot.loadingTranscript = false;
          });
        }
      });
    });
  }
  
  /**
   * Process a single participant's audio for transcription
   * @param participantIndex The index of the participant
   * @param audioBlob The audio blob to transcribe
   * @param onComplete Callback when processing is complete
   */
  private processParticipantAudio(participantIndex: number, audioBlob: Blob, onComplete: () => void): void {
    // Set loading state for this participant
    if (participantIndex in this.videoSlots) {
      this.videoSlots[participantIndex].loadingTranscript = true;
    }
    
    // Display processing state
    this.addParticipantTranscript(
      participantIndex, 
      "Processing audio with OpenAI GPT for high-quality transcription..."
    );
    
    // Use the simpler direct transcription method similar to interview component
    this.apiService.transcribeAudioFile(audioBlob).subscribe({
      next: (response) => {
        console.log(`Transcription received for participant ${participantIndex}:`, response);
        
        // Update transcript UI if we have a valid response
        if (response && response.transcript) {
          const formattedTranscript = `${this.getParticipantName(participantIndex)}: ${response.transcript}`;
          this.addParticipantTranscript(participantIndex, formattedTranscript);
          
          // Store the raw transcript for potential reuse
          this.participantTranscripts[participantIndex] = response.transcript;
          
          // Also save the transcript separately for persistence
          this.saveTranscriptLocally(participantIndex, formattedTranscript);
          
          console.log(`Transcription successfully processed for participant ${participantIndex}`);
        } else {
          console.warn(`No transcript data in response for participant ${participantIndex}`);
          
          // Use any real-time transcript we collected as a fallback
          if (this.participantTranscripts[participantIndex] && this.participantTranscripts[participantIndex].trim() !== '') {
            const fallbackText = `${this.getParticipantName(participantIndex)}: ${this.participantTranscripts[participantIndex]}`;
            this.addParticipantTranscript(participantIndex, fallbackText);
            
            // Save the transcript locally
            this.saveTranscriptLocally(participantIndex, fallbackText);
          } else {
            this.addParticipantTranscript(participantIndex, "No transcript available from server. Speech was recorded for the interview.");
          }
        }
        
        // Update loading state
        if (participantIndex in this.videoSlots) {
          this.videoSlots[participantIndex].loadingTranscript = false;
        }
        
        // Call completion callback
        onComplete();
      },
      error: (error) => {
        console.error(`Error transcribing audio for participant ${participantIndex}:`, error);
        
        // Use any real-time transcript we collected as a fallback
        if (this.participantTranscripts[participantIndex] && this.participantTranscripts[participantIndex].trim() !== '') {
          const fallbackText = `${this.getParticipantName(participantIndex)}: ${this.participantTranscripts[participantIndex]}`;
          this.addParticipantTranscript(participantIndex, fallbackText);
          
          // Save the fallback transcript locally
          this.saveTranscriptLocally(participantIndex, fallbackText);
        } else {
          // Add error message to transcript
          this.addParticipantTranscript(
            participantIndex, 
            `Error generating transcript: ${error.message || 'Unknown error'}. Speech was recorded for the interview.`
          );
        }
        
        // Update loading state
        if (participantIndex in this.videoSlots) {
          this.videoSlots[participantIndex].loadingTranscript = false;
        }
        
        // Call completion callback
        onComplete();
      }
    });
  }
  
  /**
   * Save transcript locally for future reference
   * @param participantIndex The index of the participant
   * @param transcript The transcript text to save
   */
  private saveTranscriptLocally(participantIndex: number, transcript: string): void {
    try {
      // Save transcript to localStorage for persistence across page reloads
      const key = `participant_${participantIndex}_transcript`;
      localStorage.setItem(key, transcript);
      console.log(`Saved transcript locally for participant ${participantIndex}`);
      
      // Also store in memory
      if (!this.savedTranscripts) {
        this.savedTranscripts = {};
      }
      this.savedTranscripts[participantIndex] = transcript;
    } catch (error) {
      console.error(`Error saving transcript locally for participant ${participantIndex}:`, error);
    }
  }
  
  /**
   * Load saved transcript for a participant
   * @param participantIndex The index of the participant
   */
  loadSavedTranscript(participantIndex: number): string | null {
    try {
      // First check memory cache
      if (this.savedTranscripts && this.savedTranscripts[participantIndex]) {
        return this.savedTranscripts[participantIndex];
      }
      
      // Then check localStorage
      const key = `participant_${participantIndex}_transcript`;
      const savedTranscript = localStorage.getItem(key);
      
      if (savedTranscript) {
        console.log(`Loaded saved transcript for participant ${participantIndex}`);
        
        // Cache in memory
        if (!this.savedTranscripts) {
          this.savedTranscripts = {};
        }
        this.savedTranscripts[participantIndex] = savedTranscript;
        
        return savedTranscript;
      }
      
      return null;
    } catch (error) {
      console.error(`Error loading saved transcript for participant ${participantIndex}:`, error);
      return null;
    }
  }

  /**
   * Display transcript directly from the saved audio file
   * @param participantIndex The index of the participant
   */
  displayTranscriptFromAudio(participantIndex: number): void {
    // Check if we already have a saved transcript
    const savedTranscript = this.loadSavedTranscript(participantIndex);
    if (savedTranscript) {
      this.addParticipantTranscript(participantIndex, savedTranscript);
      return;
    }
    
    // Check if we have the audio blob
    if (!this.audioBlobs[participantIndex] || this.audioBlobs[participantIndex].size < 1000) {
      console.warn(`No valid audio blob for participant ${participantIndex} to transcribe`);
      this.addParticipantTranscript(participantIndex, "No valid audio recording found to transcribe.");
      return;
    }
    
    // Process the audio to get the transcript
    this.processParticipantAudio(participantIndex, this.audioBlobs[participantIndex], () => {
      console.log(`Audio processing completed for participant ${participantIndex}`);
    });
  }

  /**
   * Adds a participant's transcript to the transcript entries
   * @param participantIndex The index of the participant
   * @param transcript The transcript text
   */
  private addParticipantTranscript(participantIndex: number, transcript: string): void {
    console.log(`Adding transcript for participant ${participantIndex}: ${transcript.substring(0, 50)}...`);
    
    // Find existing entry for this participant
    const existingIndex = this.combinedTranscript.findIndex(entry => entry.participantIndex === participantIndex);
    
    if (existingIndex !== -1) {
      // Update existing entry
      this.combinedTranscript[existingIndex].text = transcript;
    } else {
      // Add new entry
      this.combinedTranscript.push({
        participantIndex,
        text: transcript
      });
    }
    
    // Also add to transcript entries for compatibility with existing code
    this.transcriptEntries.push({
      participantIndex: participantIndex,
      text: transcript,
      timestamp: new Date()
    });
    
    // Sort entries by timestamp
    this.transcriptEntries.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
    
    console.log('Updated transcript entries:', this.transcriptEntries);
    console.log('Combined transcript:', this.combinedTranscript);
  }

  /**
   * Get the transcript for a specific participant
   * @param participantIndex The index of the participant
   */
  getParticipantTranscript(participantIndex: number): string {
    // Debug logging
    console.log(`Getting transcript for participant ${participantIndex}`);
    console.log(`Combined transcript entries:`, this.combinedTranscript);
    
    // Check for participant in combined transcript first (from server transcription)
    const transcript = this.combinedTranscript.find(entry => entry.participantIndex === participantIndex);
    if (transcript && transcript.text && transcript.text.trim() !== '') {
      console.log(`Found transcript in combined transcript: ${transcript.text.substring(0, 50)}...`);
      return transcript.text;
    }
    
    // Fall back to real-time transcript if available
    if (this.participantTranscripts[participantIndex] && this.participantTranscripts[participantIndex].trim() !== '') {
      console.log(`Using real-time transcript: ${this.participantTranscripts[participantIndex].substring(0, 50)}...`);
      return this.participantTranscripts[participantIndex];
    }
    
    console.log(`No transcript found for participant ${participantIndex}`);
    return "No transcript available for this participant.";
  }
  
  /**
   * Check if any participant has real-time transcripts
   */
  hasParticipantTranscripts(): boolean {
    return Object.keys(this.participantTranscripts).length > 0 && 
      Object.values(this.participantTranscripts).some(transcript => transcript.trim() !== '');
  }
  
  /**
   * Get all participant transcript entries for display
   */
  getParticipantTranscriptEntries(): Array<{participantIndex: number, text: string, interimText?: string}> {
    const entries: Array<{participantIndex: number, text: string, interimText?: string}> = [];
    
    Object.keys(this.participantTranscripts).forEach(indexStr => {
      const participantIndex = parseInt(indexStr);
      const text = this.participantTranscripts[participantIndex] || '';
      const interimText = this.participantInterimTranscripts[participantIndex] || '';
      
      if (text.trim() !== '' || interimText.trim() !== '') {
        entries.push({
          participantIndex,
          text,
          interimText: interimText.trim() !== '' ? interimText : undefined
        });
      }
    });
    
    // Sort by participant index (main participant first)
    return entries.sort((a, b) => a.participantIndex - b.participantIndex);
  }
  
  /**
   * Get the participant's name
   * @param participantIndex The index of the participant
   */
  getParticipantName(participantIndex: number): string {
    return this.participantNames[participantIndex] || `Participant ${participantIndex + 1}`;
  }
  
  /**
   * Format transcripts chronologically with speaker indicators
   * This combines all participant transcripts into a single chronological conversation
   * @returns Formatted transcript string with speaker indicators and timestamps
   */
  formatChronologicalTranscript(): string {
    // Create a combined array of transcript entries with participant info
    const allTranscriptEntries: Array<{
      participantIndex: number,
      participantName: string,
      text: string,
      timestamp: Date
    }> = [];
    
    // Process each participant's transcript
    Object.entries(this.participantTranscripts).forEach(([participantIndexStr, transcript]) => {
      if (!transcript) return;
      
      const participantIndex = parseInt(participantIndexStr);
      const participantName = this.getParticipantName(participantIndex);
      
      // Split transcript into sentences and add them as separate entries
      // This is a simple approach - in a real system we might have more precise timestamps
      const sentences = transcript.split(/(?<=[.!?])\s+/);
      
      // Create a timestamp for each sentence (for demo purposes, we'll space them 5 seconds apart)
      const baseTime = new Date();
      baseTime.setMinutes(baseTime.getMinutes() - sentences.length); // Start from minutes ago
      
      sentences.forEach((sentence, index) => {
        if (!sentence.trim()) return;
        
        const entryTime = new Date(baseTime);
        entryTime.setSeconds(entryTime.getSeconds() + (index * 5)); // Add 5 seconds per sentence
        
        allTranscriptEntries.push({
          participantIndex,
          participantName,
          text: sentence.trim(),
          timestamp: entryTime
        });
      });
    });
    
    // Sort all entries chronologically
    allTranscriptEntries.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
    
    // Format the combined transcript with speaker indicators and timestamps
    let formattedTranscript = '';
    
    allTranscriptEntries.forEach(entry => {
      const timeString = entry.timestamp.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
      formattedTranscript += `[${timeString}] ${entry.participantName}: ${entry.text}\n`;
    });
    
    return formattedTranscript.trim();
  }

  /**
   * Generate feedback for a participant's response
   * @param participantIndex The index of the participant
   */
  generateParticipantFeedback(participantIndex: number): void {
    // Get the participant's transcript
    const transcript = this.getParticipantTranscript(participantIndex);
    
    // If there's no transcript, show an error
    if (!transcript || transcript.trim().length === 0) {
      this.feedbackGenerationError[participantIndex] = 'No transcript available. Record a response first.';
      return;
    }
    
    // If there's no question, show an error
    if (!this.currentQuestion || this.currentQuestion.trim().length === 0) {
      this.feedbackGenerationError[participantIndex] = 'No question available. Please add a question first.';
      return;
    }
    
    // Mark as loading
    this.isGeneratingFeedback[participantIndex] = true;
    this.feedbackGenerationError[participantIndex] = null;
    
    // Get the participant name
    const participantName = this.getParticipantName(participantIndex);
    
    // Format the transcript chronologically with all participant contributions
    // This gives better context for the AI to evaluate team interactions
    const chronologicalTranscript = this.formatChronologicalTranscript();
    
    // Get names of other participants for team interaction analysis
    const otherParticipants: string[] = [];
    
    // Extract names of other participants from the participantNames object
    Object.entries(this.participantNames).forEach(([idx, name]) => {
      if (parseInt(idx) !== participantIndex && name) {
        otherParticipants.push(name);
      }
    });
    
    // Prepare data for the feedback request
    const data = {
      role: this.role || 'Candidate',
      company: this.company || 'Assessment Centre',
      participantName: participantName,
      transcript: chronologicalTranscript,
      question: this.currentQuestion,
      otherParticipants: otherParticipants
    };
    
    console.log(`Generating feedback for ${participantName} with chronological transcript:`, data);
    
    // Use the dedicated assessment centre service for feedback
    this.assessmentCentreService.generateFeedback(data).subscribe({
      next: (response) => {
        console.log(`Feedback received for ${participantName}:`, response);
        if (response && response.feedback) {
          this.participantFeedback[participantIndex] = response;
          
          // Scroll to the feedback section
          setTimeout(() => {
            const feedbackElement = document.querySelector(`.participant-${participantIndex} .feedback-content`);
            if (feedbackElement) {
              feedbackElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 100);
        } else {
          console.warn(`Empty feedback received for ${participantName}`);
          this.feedbackGenerationError[participantIndex] = 'Received empty feedback from the server.';
        }
        this.isGeneratingFeedback[participantIndex] = false;
      },
      error: (error) => {
        console.error(`Error generating feedback for ${participantName}:`, error);
        // Provide more specific error message based on HTTP status
        if (error.status === 400) {
          this.feedbackGenerationError[participantIndex] = 'The server couldn\'t process this request. Please ensure the transcript and question are valid.';
        } else if (error.status === 0) {
          this.feedbackGenerationError[participantIndex] = 'Cannot connect to the server. Please check your internet connection.';
        } else {
          this.feedbackGenerationError[participantIndex] = `Error: ${error.message || 'Unknown error'}`;
        }
        this.isGeneratingFeedback[participantIndex] = false;
      }
    });
  }
  
  /**
   * Gets feedback for a participant if available
   * @param participantIndex The index of the participant
   */
  getParticipantFeedback(participantIndex: number): string {
    const feedback = this.participantFeedback[participantIndex];
    return feedback ? feedback.feedback : '';
  }
  
  /**
   * Get the feedback object for a participant
   * @param participantIndex Index of the participant
   * @returns The feedback object or undefined
   */
  getParticipantFeedbackObject(participantIndex: number): AssessmentCentreFeedback | undefined {
    return this.participantFeedback[participantIndex];
  }
  
  /**
   * Helper method to get object keys for use in templates
   * @param obj The object to get keys from
   * @returns Array of keys
   */
  objectKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }
  
  /**
   * Helper method to get object entries for use in templates
   * @param obj The object to get entries from
   * @returns Array of key-value pairs
   */
  objectEntries(obj: any): [string, any][] {
    return obj ? Object.entries(obj) : [];
  }
  
  /**
   * Checks if feedback is being generated for a participant
   * @param participantIndex The index of the participant
   */
  isParticipantFeedbackLoading(participantIndex: number): boolean {
    return this.isGeneratingFeedback[participantIndex] || false;
  }
  
  /**
   * Gets any error that occurred while generating feedback
   * @param participantIndex The index of the participant
   */
  getParticipantFeedbackError(participantIndex: number): string {
    return this.feedbackGenerationError[participantIndex] || '';
  }
  
  /**
   * Get the IDs of participants who have audio recordings
   */
  getActiveParticipantIds(): number[] {
    return Object.keys(this.audioBlobs)
      .map(id => parseInt(id))
      .filter(id => this.audioBlobs[id] && this.audioBlobs[id].size > 0)
      .sort((a, b) => a - b); // Sort by participant index
  }
  
  /**
   * Get the audio duration for a participant
   * @param participantIndex The index of the participant
   */
  getParticipantAudioDuration(participantIndex: number): number | null {
    if (this.participantAudioDurations[participantIndex]) {
      return this.participantAudioDurations[participantIndex];
    }
    
    // Estimate based on audio blob size if we don't have an exact duration
    if (this.audioBlobs[participantIndex]) {
      // Rough estimate: ~16KB per second for 16kHz 16-bit mono audio
      const estimatedDurationSec = Math.round(this.audioBlobs[participantIndex].size / 16000);
      this.participantAudioDurations[participantIndex] = estimatedDurationSec;
      return estimatedDurationSec;
    }
    
    return null;
  }
  
  /**
   * Stops real-time transcription for all participants
   */
  private stopRealtimeTranscription(): void {
    console.log('Stopping real-time transcription for all participants');
    
    // Stop all speech recognition instances
    Object.keys(this.speechRecognitionInstances).forEach(indexStr => {
      const participantIndex = parseInt(indexStr);
      const recognition = this.speechRecognitionInstances[participantIndex];
      
      if (recognition) {
        try {
          recognition.stop();
          console.log(`Stopped real-time transcription for participant ${participantIndex}`);
        } catch (error) {
          console.error(`Error stopping real-time transcription for participant ${participantIndex}:`, error);
        }
      }
    });
    
    // Clear the instances
    this.speechRecognitionInstances = {};
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
      
      // Initialize participant transcript if not exists
      if (!this.participantTranscripts[participantIndex]) {
        this.participantTranscripts[participantIndex] = '';
      }
      
      // Store the recognition instance for later stopping
      this.speechRecognitionInstances[participantIndex] = recognition;
      
      // Handle results event - fired when speech is recognized
      recognition.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';
        
        // Process results
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }
        
        // Update participant transcripts
        if (finalTranscript.trim() !== '') {
          this.participantTranscripts[participantIndex] = 
            (this.participantTranscripts[participantIndex] || '') + finalTranscript;
          
          // Only log meaningful transcripts (more than just spaces)
          console.log(`Transcribed text for participant ${participantIndex}:`, finalTranscript);
        }
        
        // Update interim transcript
        this.participantInterimTranscripts[participantIndex] = interimTranscript;
      };
      
      // Handle errors
      recognition.onerror = (event: any) => {
        console.error(`Speech recognition error for participant ${participantIndex}:`, event.error);
        // Try to restart if there's a non-fatal error
        if (event.error !== 'no-speech' && event.error !== 'aborted' && this.isRecording) {
          setTimeout(() => {
            if (this.isRecording) {
              console.log(`Restarting speech recognition for participant ${participantIndex} after error`);
              this.startRealtimeTranscription(participantIndex, stream);
            }
          }, 1000);
        }
      };
      
      // Handle end event - may fire after errors or completion
      recognition.onend = () => {
        console.log(`Speech recognition ended for participant ${participantIndex}`);
        // Try to restart if recording is still active
        if (this.isRecording) {
          setTimeout(() => {
            if (this.isRecording) {
              console.log(`Restarting speech recognition for participant ${participantIndex}`);
              this.startRealtimeTranscription(participantIndex, stream);
            }
          }, 1000);
        }
      };
      
      // Start recognition
      try {
        recognition.start();
        console.log(`Started real-time transcription for participant ${participantIndex}`);
      } catch (error) {
        console.error(`Error starting speech recognition for participant ${participantIndex}:`, error);
      }
    } catch (error) {
      console.error(`Error starting real-time transcription for participant ${participantIndex}:`, error);
    }
  }

  /**
   * Retry transcription for a specific participant
   * @param participantIndex The index of the participant to retry transcription for
   */

  

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

  /**
    return Object.keys(this.audioBlobs).length > 0;
  }
  
  /**
   * Checks if there are any recorded audio files for transcription
   */
  hasRecordedAudio(): boolean {
    return Object.keys(this.audioBlobs).length > 0;
  }

  /**
   * Display transcripts for all participants that have recorded audio
   */
  displayAllTranscripts(): void {
    // Find all participants with audio recordings
    const participantIds = Object.keys(this.audioBlobs).map(id => parseInt(id));
    
    if (participantIds.length === 0) {
      console.warn('No recorded audio found for any participant');
      return;
    }
    
    console.log(`Processing transcripts for ${participantIds.length} participants`);
    
    // Counter to track progress
    let completedCount = 0;
    
    // Process each participant one by one
    participantIds.forEach(participantId => {
      // Check if we already have a saved transcript
      const savedTranscript = this.loadSavedTranscript(participantId);
      
      if (savedTranscript) {
        // Display existing transcript
        this.addParticipantTranscript(participantId, savedTranscript);
        completedCount++;
        
        // If all participants are processed, show completion message
        if (completedCount === participantIds.length) {
          console.log('All transcripts displayed successfully');
        }
      } else if (this.audioBlobs[participantId] && this.audioBlobs[participantId].size >= 1000) {
        // Set loading state
        if (participantId in this.videoSlots) {
          this.videoSlots[participantId].loadingTranscript = true;
        }
        
        // Display processing message
        this.addParticipantTranscript(
          participantId,
          `Processing audio for ${this.getParticipantName(participantId)}...`
        );
        
        // Process audio for transcription
        this.processParticipantAudio(participantId, this.audioBlobs[participantId], () => {
          completedCount++;
          console.log(`Processed participant ${participantId}, ${completedCount} of ${participantIds.length} complete`);
          
          // If all participants are processed, show completion message
          if (completedCount === participantIds.length) {
            console.log('All transcripts processed successfully');
          }
        });
      } else {
        // No valid audio for this participant
        this.addParticipantTranscript(
          participantId,
          `No valid audio recording found for ${this.getParticipantName(participantId)}`
        );
        completedCount++;
        
        // If all participants are processed, show completion message
        if (completedCount === participantIds.length) {
          console.log('All transcripts displayed successfully');
        }
      }
    });
  }
  
  /**
   * Retry the transcription for a specific participant
   * @param participantIndex The index of the participant
   */
  retryTranscription(participantIndex: number): void {
    console.log(`Retrying transcription for participant ${participantIndex}`);
    
    // Check if we have the audio blob
    if (!this.audioBlobs[participantIndex]) {
      console.error(`No audio blob available for participant ${participantIndex}`);
      this.addParticipantTranscript(participantIndex, `Error: No audio recording found for ${this.getParticipantName(participantIndex)}`);
      return;
    }
    
    // Clear any existing transcript for this participant
    const existingIndex = this.combinedTranscript.findIndex(entry => entry.participantIndex === participantIndex);
    if (existingIndex !== -1) {
      this.combinedTranscript.splice(existingIndex, 1);
    }
    
    // Show loading message
    this.addParticipantTranscript(participantIndex, `Retrying transcription for ${this.getParticipantName(participantIndex)}...`);
    
    // Set loading state
    if (participantIndex in this.videoSlots) {
      this.videoSlots[participantIndex].loadingTranscript = true;
    }
    
    // Use the simplified transcription approach directly
    this.apiService.transcribeAudioFile(this.audioBlobs[participantIndex]).subscribe({
      next: (response) => {
        console.log(`Retry transcription received for participant ${participantIndex}:`, response);
        
        if (response && response.transcript) {
          const formattedTranscript = `${this.getParticipantName(participantIndex)}: ${response.transcript}`;
          this.addParticipantTranscript(participantIndex, formattedTranscript);
          
          // Store the raw transcript
          this.participantTranscripts[participantIndex] = response.transcript;
          
          // Save locally for persistence
          this.saveTranscriptLocally(participantIndex, formattedTranscript);
          
          console.log(`Retry transcription successfully processed for participant ${participantIndex}`);
        } else {
          console.warn(`No transcript data in retry response for participant ${participantIndex}`);
          this.addParticipantTranscript(
            participantIndex, 
            "Transcription retry failed. Please try again or use manual transcription."
          );
        }
        
        // Update loading state
        if (participantIndex in this.videoSlots) {
          this.videoSlots[participantIndex].loadingTranscript = false;
        }
      },
      error: (error) => {
        console.error(`Error retrying transcription for participant ${participantIndex}:`, error);
        this.addParticipantTranscript(
          participantIndex, 
          `Error during transcription retry: ${error.message || 'Unknown error'}. Please try again.`
        );
        
        // Update loading state
        if (participantIndex in this.videoSlots) {
          this.videoSlots[participantIndex].loadingTranscript = false;
        }
      }
    });
  }

  /**
   * Clears saved transcripts from localStorage
   */
  private clearSavedTranscripts(): void {
    try {
      // Clear all saved transcripts from localStorage
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('participant_') && key.endsWith('_transcript')) {
          localStorage.removeItem(key);
        }
      });
      console.log('Cleared saved transcripts from localStorage');
    } catch (error) {
      console.error('Error clearing saved transcripts:', error);
    }
  }
}
