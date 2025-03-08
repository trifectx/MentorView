import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, Input, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { InterviewDetails } from '../../shared/types';

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
    imports: [CommonModule],
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
    private intervalId: any;

    // Injecting ApiService for API calls
    constructor(private apiService: ApiService) { }

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
                this.videoBlob = new Blob(this.recordedBlobs, { type: 'video/mp4' });

                // Send the recorded video to the server
                this.sendToServer();

                // Update the recorded video element
                this.recordVideoElement.src = URL.createObjectURL(this.videoBlob);
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
        this.mediaRecorder?.stop();
        this.isRecording = false;
        clearInterval(this.intervalId);
        this.showVideos = true;
    }

    sendToServer() {
        this.apiService.uploadVideo(this.videoBlob)
            .subscribe((response) => {
                console.log(response);
            });
    }

    getTranscript() {
        this.loadingTranscript = true;
        this.transcript = ''; // Clear previous transcript when starting a new request

        this.apiService.transcribeVideo()
            .subscribe({
                next: (response: any) => {
                    this.transcript = response.transcript || "No transcript available";
                    this.loadingTranscript = false;
                },
                error: (error: any) => {
                    this.transcript = error.error?.error || "Error occurred while fetching the transcript";
                    this.loadingTranscript = false;
                }
            });
    }

    getRating() {
        this.loadingRating = true;
        this.rating = ''; // Clear previous rating when starting a new request

        const data = {
            role: this.interviewDetails.role,
            company: this.interviewDetails.company,
            style: this.interviewDetails.style,
            transcript: this.transcript,
            question: this.interviewDetails.question
        };

        console.log(data);

        this.apiService.rateAnswer(data)
            .subscribe({
                next: (response: any) => {
                    this.rating = response.feedback;
                    this.loadingRating = false;
                },
                error: (error) => {
                    console.error('Error getting rating:', error);
                    this.loadingRating = false;
                    this.rating = 'Error getting feedback. Please try again.';
                }
            });
    }
}
