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

  videoSlots: VideoSlot[] = [
    { active: false, micMuted: true, camActive: true },
    { active: false, micMuted: true, camActive: true },
    { active: false, micMuted: true, camActive: true },
    { active: false, micMuted: true, camActive: true }
  ];

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
}
