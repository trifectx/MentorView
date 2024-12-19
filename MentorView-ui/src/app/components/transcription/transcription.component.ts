import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';


@Component({
    selector: 'app-transcription',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './transcription.component.html',
    styleUrl: './transcription.component.css',
})
export class TranscriptionComponent {
    @ViewChild('video') videoElementRef!: ElementRef; // reference to live video element
    @ViewChild('recordedVideo') recordVideoElementRef!: ElementRef; // reference to recorded video element

    videoResponse: HTMLVideoElement; // DOM element for video stream
    stream!: MediaStream;
    videoElement!: HTMLVideoElement;
    recordVideoElement!: HTMLVideoElement;
    mediaRecorder: any;
    recordedBlobs!: Blob[];
    isRecording: boolean = false;
    videoUrl: any;
    showCam = false;
    showVideos = false;
    videoBlob!: Blob;
    apiUrl = "http://localhost:5000";
    transcript = '';
    loadingTranscript = false;
    rating = '';
    loadingRating = false;

    // Injecting HttpClient for API calls and PLATFORM_ID for platform checks
    constructor(
        private apiClient: HttpClient,
        @Inject(PLATFORM_ID) private platformId: object
    ) { }

    ngOnInit() {
        // Ensure this is only executed in the browser environment
        if (isPlatformBrowser(this.platformId)) {
            this.videoResponse = document.getElementById('videoStream') as HTMLVideoElement;
        }
    }
    
    // Start the webcam stream
    getCam() {
        navigator.mediaDevices
            .getUserMedia({ video: { width: 300, height: 300 }, audio: true })
            .then((stream) => this.handleStreamSuccess(stream))
            .catch((error) => this.handleStreamError(error));
    }

    // Handle successful stream retrieval
    private handleStreamSuccess(stream: MediaStream) {
        this.showCam = true;
        this.stream = stream;

        // Assign video elements
        this.videoElement = this.videoElementRef.nativeElement;
        this.recordVideoElement = this.recordVideoElementRef.nativeElement;

        this.videoElement.srcObject = stream;

        // Assign stream to videoResponse if the element exists
        if (this.videoResponse) {
            this.videoResponse.srcObject = stream;
        }

        console.log('Video stream started successfully', stream);
    }

    // Handle errors during stream retrieval
    private handleStreamError(error: Error) {
        console.error('Failed to access user media:', error);
        alert('Could not get the camera');
    }

    // Stop the camera
    stopCam() {
        if (this.stream) {
            let tracks = this.stream.getTracks();
            tracks.forEach((track: MediaStreamTrack) => track.stop());
            this.stream = null;
        }
        this.showCam = false;
    }

    // Start recording
    start() {
        this.recordedBlobs = [];
        let mediaRecorderOption: any = { mimeType: 'video/mp4' };
        this.mediaRecorder = new MediaRecorder(
            this.stream,
            mediaRecorderOption
        );
        this.mediaRecorder.start();
        this.isRecording = !this.isRecording;
        this.showVideos = false;
        console.log(this.mediaRecorder.state);

        try {
            // ondataavailable event from mediaRecorder object
            this.mediaRecorder.ondataavailable = (event: any) => {
                if (event.data && event.data.size > 0) {
                    this.recordedBlobs.push(event.data);
                }
            };
        } catch {
            (error: any) => console.log(error);
        }

        try {
            // onstop event from mediaRecorder object
            this.mediaRecorder.onstop = (event: any) => {
                const videoBuffer = new Blob(this.recordedBlobs, {
                    type: 'video/mp4',
                });
                this.videoBlob = videoBuffer;
                this.sendToServer();
                this.videoUrl = window.URL.createObjectURL(videoBuffer);
                console.log('Video URL', this.videoUrl);
                this.recordVideoElement.src = this.videoUrl;
            };
        } catch {
            (error: any) => console.log(error);
        }
        console.log(this.recordedBlobs);
    }

    // Stop recording
    stop() {
        this.mediaRecorder.stop();
        this.isRecording = !this.isRecording;
        this.showVideos = true;
    }

    sendToServer() {
        const formData = new FormData();
        formData.append('file', this.videoBlob);
        // Post to upload endpoint
        this.apiClient
            .post(`${this.apiUrl}/upload`, formData)
            .subscribe((response) => {
                console.log(response);
            });
    }

    getTranscript() {
        this.loadingTranscript = true;
        this.transcript = ''; // Clear previous transcript when starting a new request

        this.apiClient
            .get(`${this.apiUrl}/transcribe`)
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

        this.apiClient
            .get(`${this.apiUrl}/query`)
            .subscribe({
                next: (response: any) => {
                    this.rating = response.feedback || "No rating available";
                    this.loadingRating = false;
                },
                error: (error: any) => {
                    this.rating = error.error?.error || "Error occurred while fetching the rating";
                    this.loadingRating = false;
                }
            });
    }
}
