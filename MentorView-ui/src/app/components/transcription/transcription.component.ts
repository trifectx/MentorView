import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, Input, OnInit, ComponentRef, ApplicationRef, Injector, ViewContainerRef } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { InterviewDetails } from '../../shared/types';
import { Router } from '@angular/router';
import { XpService } from '../../services/xp.service';
import { XpNotificationComponent } from '../xp-notification/xp-notification.component';
import { createComponent } from '@angular/core';

declare const faceapi: any;

interface FacialDetectionResults {
    noPersonDetectedAmount: number;
    multiplePersonsDetectedAmount: number;
    angry: number;
    disgusted: number;
    fearful: number;
    happy: number;
    neutral: number;
    sad: number;
    surprised: number;
}

@Component({
    selector: 'app-transcription',
    standalone: true,
    imports: [CommonModule, XpNotificationComponent],
    templateUrl: './transcription.component.html',
    styleUrl: './transcription.component.css',
})
export class TranscriptionComponent implements OnInit {
    @ViewChild('video') videoElementRef!: ElementRef<HTMLVideoElement>;
    @ViewChild('recordedVideo') recordVideoElementRef!: ElementRef<HTMLVideoElement>;
    @Input() interviewDetails!: InterviewDetails;

    stream!: MediaStream;
    videoElement!: HTMLVideoElement;
    recordVideoElement!: HTMLVideoElement;
    mediaRecorder: MediaRecorder | null = null;
    videoBlob!: Blob;
    recordedBlobs!: Blob[];
    isRecording: boolean = false;
    showCam = false;
    showVideos = false;
    transcript = '';
    loadingTranscript = false;
    rating = '';
    loadingRating = false;
    isFacialRecognitionPaused = true; // Start paused
    facialDetectionResults: FacialDetectionResults = {
        noPersonDetectedAmount: 0,
        multiplePersonsDetectedAmount: 0,
        angry: 0,
        disgusted: 0,
        fearful: 0,
        happy: 0,
        neutral: 0,
        sad: 0,
        surprised: 0
    };
    
    // Save interview states
    loadingSave = false;
    saveSuccess = false;
    saveError = '';
    isSaved = false;
    savedInterviewId = '';
    
    private intervalId: any;

    // WPM tracking properties
    currentWpm: number = 0;
    wordCount: number = 0;
    recordingStartTime: number = 0;
    speechRecognition: any = null;
    wpmUpdateIntervalId: any = null;
    wpmHistory: number[] = [];
    averageWpm: number = 0;
    recognizedText: string = '';
    lastProcessedLength: number = 0;
    
    // Filler word tracking
    fillerWords: {[key: string]: number} = {
        'um': 0,
        'uh': 0,
        'like': 0,
        'you know': 0,
        'actually': 0,
        'basically': 0,
        'literally': 0,
        'so': 0,
        'i mean': 0,
        'kind of': 0,
        'sort of': 0
    };
    totalFillerWords: number = 0;

    // Injecting ApiService for API calls
    constructor(private apiService: ApiService, private router: Router, private xpService: XpService, private injector: Injector, private appRef: ApplicationRef, private viewContainerRef: ViewContainerRef) { }

    ngOnInit() {
        setTimeout(() => {
            this.getCam();
        }, 500); // Small delay to ensure DOM is ready
    }

    getCam() {
        const constraints = {
            video: {
                width: 300,
                height: 300,
                // Prevent automatic mirroring of the webcam feed
                facingMode: 'user',
                // Some browsers support this property to disable mirroring
                mirror: false
            },
            audio: true
        };

        navigator.mediaDevices
            .getUserMedia(constraints)
            .then((stream) => this.handleStreamSuccess(stream))
            .catch((error) => this.handleStreamError(error));
    }

    // Handle successful stream retrieval
    private async handleStreamSuccess(stream: MediaStream) {
        this.showCam = true;
        this.stream = stream;

        // Assign video elements
        this.videoElement = this.videoElementRef.nativeElement;
        this.recordVideoElement = this.recordVideoElementRef.nativeElement;
        this.videoElement.srcObject = stream;

        // load face-api models
        // pre-trained machine learning for facial detection
        await Promise.all([
            faceapi.nets.ssdMobilenetv1.loadFromUri('./models'),
            // faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
            // faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
            // faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
            // faceapi.nets.ageGenderNet.loadFromUri('./models'),
            faceapi.nets.faceExpressionNet.loadFromUri('./models')
        ]);

        console.log('Successfully got the camera stream');
    }

    // Handle errors during stream retrieval
    private handleStreamError(error: Error) {
        console.error('Failed to access user media:', error);
        alert('Could not get the camera stream');
    }

    // Stop the camera
    stopCam() {
        if (this.stream) {
            let tracks = this.stream.getTracks();
            tracks.forEach((track: MediaStreamTrack) => track.stop());
            this.stream = null!;
        }
        this.showCam = false;
    }

    // Start recording
    start() {
        // Setup media recorder for the first time
        if (!this.mediaRecorder) {
            this.setupMediaRecorder();
        }

        this.recordedBlobs = []; // Clear previous recorded blobs before starting new recording
        this.mediaRecorder?.start();
        this.isRecording = true;
        this.showVideos = false;
        this.isFacialRecognitionPaused = true; // Start paused
        
        // Reset save state
        this.isSaved = false;
        this.saveSuccess = false;
        this.saveError = '';
        this.savedInterviewId = '';
        this.transcript = '';
        this.rating = '';

        // Reset WPM tracking
        this.currentWpm = 0;
        this.wordCount = 0;
        this.recordingStartTime = Date.now();
        this.wpmHistory = [];
        this.averageWpm = 0;
        this.recognizedText = '';
        this.lastProcessedLength = 0;

        // Start WPM tracking
        this.startSpeechRecognition();
        
        // Update WPM every second
        this.wpmUpdateIntervalId = setInterval(() => {
            this.updateWpm();
        }, 1000);

        console.log('Recording started. Facial recognition is paused.');

        // facial detection and expression recognition
        // using ssdmobilev1net model
        this.intervalId = setInterval(async () => {
            if (!this.isFacialRecognitionPaused) {
                this.runFacialRecognition();
            }
        }, 200);
    }

    private async runFacialRecognition() {
        let detections = await faceapi
            .detectAllFaces(this.videoElement)
            .withFaceExpressions();

        // console.log(detections);

        // detections.length is the amount of faces detected in the video feed
        if (detections.length <= 0) {
            console.log("no person detected");
            this.facialDetectionResults.noPersonDetectedAmount++;
        }
        else if (detections.length > 1) {
            this.facialDetectionResults.multiplePersonsDetectedAmount++;
        }

        // check for facial expressions
        detections.forEach((face: any) => {
            const expressions = face.expressions;
            for (const [expression, probability] of Object.entries(expressions)) {
                if (probability as number > 0.5) {
                    console.log("Expression", expression + " detected with probability", probability);
                    // Increment the count for the detected expression
                    if (expression in this.facialDetectionResults) {
                        this.facialDetectionResults[expression as keyof FacialDetectionResults]++;
                    }
                    else {
                        console.error("Unknown expression detected");
                    }
                }
            }
        });
    }

    // Set up the media recorder
    private setupMediaRecorder() {
        try {
            const mediaRecorderOptions: MediaRecorderOptions = { mimeType: 'video/mp4' };
            this.mediaRecorder = new MediaRecorder(this.stream, mediaRecorderOptions);

            // Set up the ondataavailable event to store recorded data
            this.mediaRecorder.ondataavailable = (event: BlobEvent) => {
                if (event.data && event.data.size > 0) {
                    this.recordedBlobs.push(event.data);
                }
            };

            // Set up the onstop event to handle the recording stop and video preparation
            this.mediaRecorder.onstop = () => {
                console.log('Recording stopped, processing video...');
                this.videoBlob = new Blob(this.recordedBlobs, { type: 'video/mp4' });

                // Send the recorded video to the server
                this.sendToServer();

                // Update the recorded video element
                this.recordVideoElement.src = URL.createObjectURL(this.videoBlob);
                
                // Show loading indicators immediately
                this.loadingTranscript = true;
                this.transcript = 'Generating transcript...';
                
                // The getTranscript will be called from the stop() method
                // to avoid duplicate calls and race conditions
            };

            console.log('Media recorder set up successfully');
        }
        catch (error) {
            console.error('Error setting up the media recorder:', error);
            alert('Could not start recording');
        }
    }

    // Toggle facial recognition
    toggleFacialRecognition() {
        this.isFacialRecognitionPaused = !this.isFacialRecognitionPaused;
        if (!this.isFacialRecognitionPaused) {
            console.log('Starting facial recognition...');
        } else {
            console.log('Facial recognition paused');
        }
    }

    // Stop recording
    stop() {
        console.log('Stopping recording...');
        this.mediaRecorder?.stop();
        this.isRecording = false;
        clearInterval(this.intervalId);
        clearInterval(this.wpmUpdateIntervalId);
        this.stopSpeechRecognition();
        this.showVideos = true;
        
        // Show loading indicator immediately
        this.loadingTranscript = true;
        this.transcript = 'Generating transcript...';
        
        // Calculate final average WPM
        if (this.wpmHistory.length > 0) {
            this.averageWpm = Math.round(
                this.wpmHistory.reduce((sum, wpm) => sum + wpm, 0) / this.wpmHistory.length
            );
        }

        // Give the mediaRecorder.onstop event time to process
        // then get the transcript automatically
        console.log('Automatically initiating transcript generation from stop method...');
        setTimeout(() => {
            // Ensure we only call getTranscript if recording has definitely stopped
            if (!this.isRecording) {
                this.getTranscript();
            }
        }, 1000); // Slightly longer timeout to ensure the recording is fully processed
    }

    sendToServer() {
        this.apiService.uploadVideo(this.videoBlob)
            .subscribe((response) => {
                console.log(response);
            });
    }

    getTranscript() {
        console.log('Starting transcript generation process...');
        this.loadingTranscript = true;
        this.transcript = 'Generating transcript...'; // Show loading message

        this.apiService.transcribeVideo()
            .subscribe({
                next: (response: any) => {
                    console.log('Transcript API response received:', response);
                    if (response && response.transcript) {
                        this.transcript = response.transcript;
                        console.log('Transcript loaded successfully');
                        this.loadingTranscript = false;
                        
                        // Immediately start rating process without delay
                        if (this.transcript && this.transcript !== "No transcript available") {
                            console.log('Automatically starting rating process...');
                            // Start rating process immediately
                            this.getRating();
                        }
                    } else {
                        this.transcript = "No transcript available";
                        console.warn('Empty or invalid transcript response');
                        this.loadingTranscript = false;
                    }
                },
                error: (error: any) => {
                    console.error('Error fetching transcript:', error);
                    this.transcript = "Error occurred while fetching the transcript. Please try again.";
                    this.loadingTranscript = false;
                }
            });
    }

    getRating() {
        this.loadingRating = true;
        this.rating = ''; // Clear previous rating when starting a new request

        // Calculate final WPM statistics if not already done
        if (this.isRecording) {
            this.stopSpeechRecognition();
            if (this.wpmHistory.length > 0) {
                this.averageWpm = Math.round(
                    this.wpmHistory.reduce((sum, wpm) => sum + wpm, 0) / this.wpmHistory.length
                );
            }
        }
        
        // Analyze filler words in the transcript
        this.analyzeFillerWords();

        const data = {
            role: this.interviewDetails.role,
            company: this.interviewDetails.company,
            style: this.interviewDetails.style,
            transcript: this.transcript,
            question: this.interviewDetails.question,
            wpm: this.averageWpm,
            fillerWords: this.fillerWords,
            totalFillerWords: this.totalFillerWords
        };

        console.log(data);

        this.apiService.rateAnswer(data)
            .subscribe({
                next: (response: any) => {
                    console.log('Got rating response:', response);
                    this.rating = response.feedback;
                    this.loadingRating = false;
                    
                    // Extract rating score for XP award
                    this.awardXPForInterview(this.rating, this.interviewDetails.question, this.interviewDetails.style);
                },
                error: (error) => {
                    console.error('Error getting rating:', error);
                    this.loadingRating = false;
                    this.rating = 'Error getting feedback. Please try again.';
                }
            });
    }
    
    saveInterview() {
        this.loadingSave = true;
        this.saveSuccess = false;
        this.saveError = '';
        
        const data = {
            role: this.interviewDetails.role,
            company: this.interviewDetails.company,
            style: this.interviewDetails.style,
            question: this.interviewDetails.question,
            transcript: this.transcript,
            feedback: this.rating,
            wpm: this.averageWpm,
            fillerWords: JSON.stringify(this.fillerWords),
            totalFillerWords: this.totalFillerWords
        };
        
        this.apiService.saveInterview(data)
            .subscribe({
                next: (response) => {
                    this.loadingSave = false;
                    this.saveSuccess = true;
                    this.isSaved = true;
                    this.savedInterviewId = response.id;
                    
                    // Show success message for 3 seconds then navigate to saved interviews
                    setTimeout(() => {
                        this.saveSuccess = false; // Hide success message
                        this.router.navigate(['/saved-interviews']);
                    }, 3000);
                },
                error: (error) => {
                    console.error('Error saving interview:', error);
                    this.loadingSave = false;
                    this.saveError = error.error?.error || 'Failed to save interview. Please try again.';
                }
            });
    }

    // Analyze filler words in the transcript
    private analyzeFillerWords() {
        if (!this.transcript) return;
        
        // Reset filler word counts
        Object.keys(this.fillerWords).forEach(word => {
            this.fillerWords[word] = 0;
        });
        this.totalFillerWords = 0;
        
        // Convert transcript to lowercase for case-insensitive matching
        const lowerTranscript = this.transcript.toLowerCase();
        
        // Count each filler word
        Object.keys(this.fillerWords).forEach(word => {
            // Use regex to find whole word matches only
            const regex = new RegExp(`\\b${word}\\b`, 'gi');
            const matches = lowerTranscript.match(regex);
            if (matches) {
                this.fillerWords[word] = matches.length;
                this.totalFillerWords += matches.length;
            }
        });
        
        console.log('Filler word analysis:', this.fillerWords);
        console.log('Total filler words:', this.totalFillerWords);
    }

    // Award XP to the user based on their interview rating
    private async awardXPForInterview(feedback: string, question: string, interviewStyle: string): Promise<void> {
        // Extract the rating score from the feedback (1-10)
        // Updated regex to handle decimal ratings (e.g., 6.5/10)
        const ratingRegex = /score:\s*(\d+(?:\.\d+)?)\/10|(\d+(?:\.\d+)?)\s*\/\s*10/i;
        const match = feedback.match(ratingRegex);
        
        if (match) {
            // Get the rating number from the match
            const rating = parseFloat(match[1] || match[2]);
            
            if (!isNaN(rating) && rating >= 1 && rating <= 10) {
                // Calculate difficulty modifier based on the question and interview style
                const difficultyModifier = this.xpService.calculateDifficultyModifier(question, interviewStyle);
                
                try {
                    // Award XP based on the rating and difficulty
                    const newTotalXP = await this.xpService.awardInterviewXP(rating, difficultyModifier);
                    console.log(`Awarded XP for interview! Rating: ${rating}, Difficulty: ${difficultyModifier.toFixed(2)}, New Total XP: ${newTotalXP}`);
                    
                    // Show XP notification (could expand this to a more detailed UI notification)
                    this.showXPAwardNotification(rating, difficultyModifier);
                } catch (error) {
                    console.error('Error awarding XP:', error);
                }
            } else {
                console.warn('Invalid rating extracted from feedback:', rating);
            }
        } else {
            console.warn('Could not extract rating from feedback');
        }
    }
    
    // Show a notification when XP is awarded
    private showXPAwardNotification(rating: number, difficultyModifier: number): void {
        const xpAwarded = Math.round(rating * 10 * difficultyModifier);
        
        // Create the notification component dynamically
        const notificationComponent = createComponent(XpNotificationComponent, {
            environmentInjector: this.appRef.injector,
            elementInjector: this.injector
        });
        
        // Set the input properties
        notificationComponent.instance.xpAmount = xpAwarded;
        notificationComponent.instance.rating = rating;
        notificationComponent.instance.difficulty = difficultyModifier;
        
        // Add to the DOM
        document.body.appendChild(notificationComponent.location.nativeElement);
        
        // Detect changes to show the component
        notificationComponent.changeDetectorRef.detectChanges();
        
        // Remove the component after animation completes
        setTimeout(() => {
            document.body.removeChild(notificationComponent.location.nativeElement);
            notificationComponent.destroy();
        }, 5500); // 5.5 seconds (5s display + 0.5s for animation)
    }

    // WPM tracking methods
    private startSpeechRecognition() {
        if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
            // Use the appropriate speech recognition API
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            this.speechRecognition = new SpeechRecognition();
            
            // Configure speech recognition
            this.speechRecognition.continuous = true;
            this.speechRecognition.interimResults = true;
            this.speechRecognition.lang = 'en-US';
            
            // Handle speech recognition results
            this.speechRecognition.onresult = (event: any) => {
                let transcript = '';
                for (let i = 0; i < event.results.length; i++) {
                    transcript += event.results[i][0].transcript;
                }
                this.recognizedText = transcript;
                
                // Count new words since last update
                const words = this.recognizedText.trim().split(/\s+/);
                const newWordCount = words.length;
                
                // Update word count if we have new words
                if (newWordCount > this.lastProcessedLength) {
                    this.wordCount += (newWordCount - this.lastProcessedLength);
                    this.lastProcessedLength = newWordCount;
                }
            };
            
            // Handle errors
            this.speechRecognition.onerror = (event: any) => {
                console.error('Speech recognition error:', event.error);
            };
            
            // Start recognition
            this.speechRecognition.start();
            console.log('Speech recognition started for WPM tracking');
        } else {
            console.error('Speech recognition not supported in this browser');
        }
    }
    
    private stopSpeechRecognition() {
        if (this.speechRecognition) {
            this.speechRecognition.stop();
            this.speechRecognition = null;
            console.log('Speech recognition stopped');
        }
    }
    
    private updateWpm() {
        if (!this.isRecording) return;
        
        const elapsedMinutes = (Date.now() - this.recordingStartTime) / 60000;
        if (elapsedMinutes > 0) {
            this.currentWpm = Math.round(this.wordCount / elapsedMinutes);
            this.wpmHistory.push(this.currentWpm);
            
            // Calculate running average
            this.averageWpm = Math.round(
                this.wpmHistory.reduce((sum, wpm) => sum + wpm, 0) / this.wpmHistory.length
            );
        }
    }
}
