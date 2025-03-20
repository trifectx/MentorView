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
    { active: false, micMuted: true, camActive: true },
    { active: false, micMuted: true, camActive: true },
    { active: false, micMuted: true, camActive: true },
    { active: false, micMuted: true, camActive: true }
  ];

  // Test video URL for voice isolation testing
  testVideoUrl: string = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
  selectedVideoFile: File | null = null;
  
  globalMicMuted = true;
  globalCamActive = true;

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

  // Debounce subjects for input fields
  private roleInputSubject = new Subject<string>();
  private companyInputSubject = new Subject<string>();

  get participantCount(): number {
    return this.videoSlots.filter(slot => slot.active).length;
  }

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
    // Initialize the component
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
   */
  selectQuestion(question: string): void {
    this.currentQuestion = question;
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
      camActive: true
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
}
