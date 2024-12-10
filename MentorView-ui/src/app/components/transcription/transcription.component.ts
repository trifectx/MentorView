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
    @ViewChild('recordedVideo') recordVideoElementRef!: ElementRef; // recordedVideo is assigned to DOM Element recordVideoElementRef. Of type ElementRef and is a child of this component
    @ViewChild('video') videoElementRef!: ElementRef; // video is assigned to DOM Element videoElementRef

    videoResponse: any; // Cam Started or not
    stream: any;
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
        // Accessing the DOM only in the browser
        if (isPlatformBrowser(this.platformId)) {
            this.videoResponse = document.getElementById('videoStream');
        }
    }

    getCam() {
        this.showCam = true;
        navigator.mediaDevices
            .getUserMedia({ video: { width: 300, height: 300 }, audio: true })
            .then((response) => {
                this.stream = response;
                console.log('Video Response', response);

                // DOM elements are assigned to their respective properties
                this.videoElement = this.videoElementRef.nativeElement;
                this.recordVideoElement =
                    this.recordVideoElementRef.nativeElement;

                this.videoElement.srcObject = response;
                if (isPlatformBrowser(this.platformId)) {
                    this.videoResponse.srcObject = response;
                }
            })
            .catch((err) => console.log('Error has occurred', err));
    }

    // Stop the camera
    stopCam() {
        if (this.stream) {
            let tracks = this.stream.getTracks();
            tracks.forEach((track: MediaStreamTrack) => track.stop());
            this.stream = null; // Reset the stream
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
