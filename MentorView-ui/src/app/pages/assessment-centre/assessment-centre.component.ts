import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
export class AssessmentCentreComponent implements OnInit, OnDestroy {
  @ViewChild('videoElement1') videoElement1!: ElementRef<HTMLVideoElement>;
  @ViewChild('videoElement2') videoElement2!: ElementRef<HTMLVideoElement>;
  @ViewChild('videoElement3') videoElement3!: ElementRef<HTMLVideoElement>;
  @ViewChild('videoElement4') videoElement4!: ElementRef<HTMLVideoElement>;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

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

  constructor(private apiService: ApiService) {
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
  }

  ngOnDestroy(): void {
    // Clean up all media streams when component is destroyed
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
   * Joins a participant slot in the assessment
   * @param slotIndex The index of the slot to join
   */
  async joinParticipantSlot(slotIndex: number): Promise<void> {
    // Check if slot is already active
    if (this.videoSlots[slotIndex].active) {
      this.leaveParticipantSlot(slotIndex);
      return;
    }

    try {
      // Request access to camera and microphone
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });

      // Store the stream in the slot
      this.videoSlots[slotIndex].stream = stream;
      this.videoSlots[slotIndex].active = true;

      // Set initial state based on global controls
      this.videoSlots[slotIndex].micMuted = this.globalMicMuted;
      this.videoSlots[slotIndex].camActive = this.globalCamActive;

      // Update the video element after Angular change detection
      setTimeout(() => {
        const videoElement = this.getVideoElement(slotIndex);
        if (videoElement) {
          videoElement.nativeElement.srcObject = stream;
          // Apply initial mute state
          videoElement.nativeElement.muted = true; // Always mute local video to prevent echo
          
          // Apply initial camera state
          this.updateVideoTrackState(slotIndex);
        }
      }, 0);

      console.log(`Participant joined slot ${slotIndex + 1}`);
    } catch (error) {
      console.error('Error accessing media devices:', error);
      alert('Could not access camera or microphone. Please check your permissions.');
    }
  }

  /**
   * Leaves a participant slot in the assessment
   * @param slotIndex The index of the slot to leave
   */
  leaveParticipantSlot(slotIndex: number): void {
    if (!this.videoSlots[slotIndex].active) {
      return;
    }

    // Stop all tracks in the stream
    if (this.videoSlots[slotIndex].stream) {
      this.videoSlots[slotIndex].stream.getTracks().forEach(track => track.stop());
    }

    // Reset the video element
    const videoElement = this.getVideoElement(slotIndex);
    if (videoElement && videoElement.nativeElement.srcObject) {
      videoElement.nativeElement.srcObject = null;
    }

    // Reset the slot
    this.videoSlots[slotIndex] = {
      active: false,
      micMuted: true,
      camActive: true,
      isRecording: false
    };

    console.log(`Participant left slot ${slotIndex + 1}`);
  }

  /**
   * Leaves all participant slots in the assessment
   */
  leaveAllSlots(): void {
    for (let i = 0; i < this.videoSlots.length; i++) {
      if (this.videoSlots[i].active) {
        this.leaveParticipantSlot(i);
      }
    }
    console.log('All participants left');
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

    // Apply to all active slots
    this.videoSlots.forEach((slot, index) => {
      if (slot.active) {
        slot.camActive = this.globalCamActive;
        this.updateVideoTrackState(index);
      }
    });

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
      this.leaveParticipantSlot(1);
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
   * Starts the interview recording for all active participants
   */
  startInterview(): void {
    if (this.isRecording) return;
    
    this.isRecording = true;
    
    // Clear any existing transcripts
    this.transcriptEntries = [];
    
    // Set loading state for all active participants
    this.videoSlots.forEach((slot, index) => {
      if (slot.active && slot.stream) {
        // Set loading state to indicate transcript generation is in progress
        slot.loadingTranscript = true;
        
        // For participant 2 (index 1) with prerecorded video, handle differently
        if (index === 1 && slot.videoBlob) {
          console.log('Participant 2 has a prerecorded video, preparing for transcription');
          // We don't start recording for prerecorded video
          slot.isRecording = false;
        } else {
          // Start recording for live participants
          this.startRecording(index);
        }
      }
    });
    
    console.log('Interview recording started, transcripts will be generated for all participants');
    
    // Generate initial transcripts for all active participants
    this.generateInitialTranscripts();
    
    // For prerecorded video in slot 2, start transcription immediately
    if (this.videoSlots[1].active && this.videoSlots[1].videoBlob) {
      this.transcribePrerecordedVideo();
    }
  }
  
  /**
   * Transcribes the prerecorded video in participant slot 2
   */
  private transcribePrerecordedVideo(): void {
    const slot = this.videoSlots[1];
    
    if (!slot.active || !slot.videoBlob) {
      console.log('No prerecorded video to transcribe');
      return;
    }
    
    console.log('Starting transcription for prerecorded video in participant slot 2');
    
    // Send the prerecorded video for transcription
    this.sendToServerAndTranscribe(1);
  }
  
  /**
   * Generates initial transcripts for all active participants
   * This provides immediate feedback to the user when starting the interview
   */
  private generateInitialTranscripts(): void {
    // Wait a short time to ensure recordings have started
    setTimeout(() => {
      this.videoSlots.forEach((slot, index) => {
        if (slot.active && slot.loadingTranscript) {
          // For prerecorded video, show different message
          if (index === 1 && slot.videoBlob) {
            const initialTranscript = "Processing prerecorded video... Transcript will be available shortly.";
            slot.transcript = initialTranscript;
            
            // Add to combined transcript
            this.addToTranscript(index, initialTranscript);
            
            console.log(`Initial transcript generated for prerecorded video (participant ${index + 1})`);
          } else {
            // Generate an initial "recording in progress" transcript for live participants
            const initialTranscript = "Recording in progress... Transcript will update when interview is completed.";
            slot.transcript = initialTranscript;
            
            // Add to combined transcript
            this.addToTranscript(index, initialTranscript);
            
            console.log(`Initial transcript generated for participant ${index + 1}`);
          }
        }
      });
    }, 2000); // Wait 2 seconds to ensure recordings have started
  }

  /**
   * Stops the interview recording for all participants
   */
  stopInterview(): void {
    if (!this.isRecording) return;
    
    console.log('Stopping interview recording and preparing for transcription...');
    
    this.isRecording = false;
    
    // Clear temporary transcripts
    this.transcriptEntries = [];
    
    // Stop recording for all recording participants
    this.videoSlots.forEach((slot, index) => {
      if (!slot.active) return; // Skip inactive slots
      
      // For participant 2 (index 1) with prerecorded video, just ensure transcript is loading
      if (index === 1 && slot.videoBlob && !slot.isRecording) {
        // If transcript is not already loading, start the process
        if (!slot.loadingTranscript) {
          slot.loadingTranscript = true;
          slot.transcript = ""; // Clear the temporary transcript
          this.sendToServerAndTranscribe(index);
        }
      } 
      // For live recordings, stop the recording
      else if (slot.isRecording) {
        // Set loading state before stopping to ensure UI shows loading indicator immediately
        slot.loadingTranscript = true;
        slot.transcript = ""; // Clear the temporary transcript
        this.stopRecording(index);
      }
    });
    
    console.log('Interview recording stopped, transcription will begin automatically');
    
    // Ensure transcripts are loaded automatically after stopping
    // This gives a small delay to allow the mediaRecorder.onstop events to fire
    setTimeout(() => {
      this.videoSlots.forEach((slot, index) => {
        if (slot.active && slot.loadingTranscript) {
          console.log(`Ensuring transcript is loaded for participant ${index + 1}`);
          // The transcription will be handled by the mediaRecorder.onstop event
          // This is just a safety check to ensure it happens
        }
      });
      
      // Force refresh transcripts after a delay to ensure they're displayed
      setTimeout(() => {
        this.forceRefreshTranscripts();
      }, 5000);
    }, 1500);
  }

  /**
   * Starts recording for a specific participant
   * @param slotIndex The index of the slot to start recording
   */
  private startRecording(slotIndex: number): void {
    const slot = this.videoSlots[slotIndex];
    
    if (!slot.active || !slot.stream || slot.isRecording) {
      return;
    }
    
    try {
      // Setup media recorder
      const mediaRecorderOptions: MediaRecorderOptions = { mimeType: 'video/mp4' };
      slot.mediaRecorder = new MediaRecorder(slot.stream, mediaRecorderOptions);
      slot.recordedBlobs = [];
      
      // Set up the ondataavailable event to store recorded data
      slot.mediaRecorder.ondataavailable = (event: BlobEvent) => {
        if (event.data && event.data.size > 0) {
          slot.recordedBlobs?.push(event.data);
        }
      };
      
      // Set up the onstop event to handle the recording stop and video preparation
      slot.mediaRecorder.onstop = () => {
        console.log(`Recording stopped for participant ${slotIndex + 1}, processing video...`);
        
        if (slot.recordedBlobs && slot.recordedBlobs.length > 0) {
          slot.videoBlob = new Blob(slot.recordedBlobs, { type: 'video/mp4' });
          
          // Send the recorded video to the server and get transcript
          this.sendToServerAndTranscribe(slotIndex);
        }
      };
      
      // Start recording
      slot.mediaRecorder.start(1000); // Collect data every second
      slot.isRecording = true;
      
      console.log(`Recording started for participant ${slotIndex + 1}`);
    } catch (error) {
      console.error(`Error starting recording for participant ${slotIndex + 1}:`, error);
    }
  }

  /**
   * Stops recording for a specific participant
   * @param slotIndex The index of the slot to stop recording
   */
  private stopRecording(slotIndex: number): void {
    const slot = this.videoSlots[slotIndex];
    
    if (!slot.isRecording || !slot.mediaRecorder) {
      return;
    }
    
    try {
      console.log(`Stopping recording for participant ${slotIndex + 1}...`);
      
      // Set loading state before stopping to ensure UI shows loading indicator immediately
      slot.loadingTranscript = true;
      
      // Stop the media recorder - this will trigger the onstop event
      slot.mediaRecorder.stop();
      slot.isRecording = false;
      
      console.log(`Recording stopped for participant ${slotIndex + 1}, waiting for processing...`);
    } catch (error) {
      console.error(`Error stopping recording for participant ${slotIndex + 1}:`, error);
      slot.isRecording = false;
      slot.loadingTranscript = false;
    }
  }

  /**
   * Sends the recorded video to the server and gets the transcript
   * @param slotIndex The index of the slot to process
   */
  private sendToServerAndTranscribe(slotIndex: number): void {
    const slot = this.videoSlots[slotIndex];
    
    if (!slot.videoBlob) {
      console.error(`No video blob available for participant ${slotIndex + 1}`);
      slot.loadingTranscript = false;
      return;
    }
    
    console.log(`Sending video to server for participant ${slotIndex + 1} and initiating transcription...`);
    
    // Upload the video
    this.apiService.uploadVideo(slot.videoBlob)
      .subscribe({
        next: () => {
          console.log(`Video uploaded for participant ${slotIndex + 1}`);
          
          // Get transcript
          this.getTranscript(slotIndex);
          
          // Add a retry mechanism in case the transcript is not available immediately
          let retryCount = 0;
          const maxRetries = 3;
          
          const retryInterval = setInterval(() => {
            if (slot.transcript && slot.transcript !== "No transcript available" && slot.transcript !== "Error generating transcript") {
              console.log(`Transcript successfully loaded for participant ${slotIndex + 1} after ${retryCount} retries`);
              clearInterval(retryInterval);
              return;
            }
            
            if (retryCount >= maxRetries) {
              console.log(`Max retries reached for participant ${slotIndex + 1}, stopping retry attempts`);
              clearInterval(retryInterval);
              return;
            }
            
            retryCount++;
            console.log(`Retry ${retryCount}/${maxRetries} for participant ${slotIndex + 1} transcript`);
            this.getTranscript(slotIndex);
          }, 5000); // Retry every 5 seconds
        },
        error: (error) => {
          console.error(`Error uploading video for participant ${slotIndex + 1}:`, error);
          slot.loadingTranscript = false;
        }
      });
  }

  /**
   * Gets the transcript for a participant's recording
   * @param slotIndex The index of the slot to get transcript for
   */
  private getTranscript(slotIndex: number): void {
    const slot = this.videoSlots[slotIndex];
    
    console.log(`Requesting transcript for participant ${slotIndex + 1}...`);
    
    this.apiService.transcribeVideo()
      .subscribe({
        next: (response) => {
          console.log(`Received transcript response for participant ${slotIndex + 1}:`, response);
          
          if (response && response.transcript) {
            slot.transcript = response.transcript;
            
            // Add to combined transcript
            this.addToTranscript(slotIndex, response.transcript);
            
            console.log(`Transcript successfully generated for participant ${slotIndex + 1}`);
            
            // Force refresh to ensure UI updates
            this.forceRefreshTranscripts();
          } else {
            slot.transcript = "No transcript available";
            console.warn(`No transcript data received for participant ${slotIndex + 1}`);
          }
          
          slot.loadingTranscript = false;
        },
        error: (error) => {
          console.error(`Error getting transcript for participant ${slotIndex + 1}:`, error);
          slot.transcript = "Error generating transcript";
          slot.loadingTranscript = false;
          
          // Add error details to help with debugging
          if (error.status) {
            console.error(`HTTP Status: ${error.status}, Message: ${error.message}`);
          }
          
          // Attempt to add a placeholder to the transcript
          this.addToTranscript(slotIndex, "Error generating transcript. Please try again.");
        }
      });
  }

  /**
   * Adds a transcript entry to the combined transcript
   * @param participantIndex The index of the participant
   * @param text The transcript text
   */
  private addToTranscript(participantIndex: number, text: string): void {
    // Check if this is a duplicate entry (same participant and similar text)
    const isDuplicate = this.transcriptEntries.some(entry => 
      entry.participantIndex === participantIndex && 
      entry.text === text
    );
    
    if (isDuplicate) {
      console.log(`Skipping duplicate transcript entry for participant ${participantIndex + 1}`);
      return;
    }
    
    console.log(`Adding transcript entry for participant ${participantIndex + 1}: ${text.substring(0, 50)}...`);
    
    this.transcriptEntries.push({
      participantIndex,
      text,
      timestamp: new Date()
    });
    
    // Sort entries by timestamp
    this.transcriptEntries.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  }

  /**
   * Force refreshes the transcripts for debugging purposes
   */
  forceRefreshTranscripts(): void {
    console.log('Force refreshing transcripts...');
    
    // Clear existing entries
    this.transcriptEntries = [];
    
    // Add entries from each participant that has a transcript
    this.videoSlots.forEach((slot, index) => {
      if (slot.transcript) {
        console.log(`Adding transcript from participant ${index + 1} to combined transcript`);
        this.addToTranscript(index, slot.transcript);
      }
    });
  }

  /**
   * Gets the combined transcript from all participants
   * @returns Array of transcript entries
   */
  getCombinedTranscript(): TranscriptEntry[] {
    return this.transcriptEntries;
  }

  /**
   * Checks if any transcript is available
   * @returns True if any transcript is available
   */
  isAnyTranscriptAvailable(): boolean {
    return this.transcriptEntries.length > 0;
  }

  /**
   * Checks if any transcript is currently loading
   * @returns True if any transcript is loading
   */
  isLoadingAnyTranscript(): boolean {
    return this.videoSlots.some(slot => slot.loadingTranscript);
  }

  /**
   * Saves all interviews with their transcripts
   */
  saveAllInterviews(): void {
    if (this.isSaving) return;
    
    this.isSaving = true;
    this.saveSuccess = false;
    this.saveError = '';
    
    // Combine all transcripts into one text
    const combinedTranscript = this.transcriptEntries
      .map(entry => `Participant ${entry.participantIndex + 1}: ${entry.text}`)
      .join('\n\n');
    
    const data = {
      role: this.role,
      company: this.company,
      style: 'Assessment Centre',
      question: this.currentQuestion,
      transcript: combinedTranscript,
      feedback: '' // No feedback for assessment centre interviews
    };
    
    this.apiService.saveInterview(data)
      .subscribe({
        next: (response) => {
          this.isSaving = false;
          this.saveSuccess = true;
          console.log('Interview saved successfully:', response);
          
          // Reset after a few seconds
          setTimeout(() => {
            this.saveSuccess = false;
          }, 3000);
        },
        error: (error) => {
          console.error('Error saving interview:', error);
          this.isSaving = false;
          this.saveError = error.error?.error || 'Failed to save interview. Please try again.';
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
}
