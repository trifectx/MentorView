import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { response } from 'express';



@Component({
  selector: 'app-transcription',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transcription.component.html',
  styleUrl: './transcription.component.css'
})
export class TranscriptionComponent {
 
    @ViewChild('recordedVideo') recordVideoElementRef! : ElementRef;  // recordedVideo is assigned to DOM Element recordVideoElementRef. Of type ElementRef and is a child of this component
    @ViewChild('video') videoElementRef!: ElementRef; // video is assigned to DOM Element videoElementRef
  
    videoResponse: any; // Cam Started or not
    stream : any;
    videoElement!: HTMLVideoElement;
    recordVideoElement!: HTMLVideoElement;
    mediaRecorder: any;
    recordedBlobs!: Blob[];
    isRecording: boolean = false;
    videoUrl : any;
    showCam = false;
    showVideos = false;
    videoBlob: Blob;
    apiUrl = 'http://localhost:5000';
    constructor(private apiClient: HttpClient) {}
    ngOnInit(){
      this.videoResponse = document.getElementById('videoStream');
    }
  
    getCam(){
      this.showCam=true;
      navigator.mediaDevices.getUserMedia({video:{width:300, height:300}, audio:true})
      .then((response)=>{
        this.stream = response;
        console.log("Video Response",response);
        this.videoElement = this.videoElementRef.nativeElement; // DOM element is assogned to VideoElement
        this.recordVideoElement = this.recordVideoElementRef.nativeElement; // Dom Element is assigned to recordVideoElemnt
        
        this.videoElement.srcObject = response;
        this.videoResponse.srcObject = response;
        }
      ).catch(err=> console.log("Error has occured"));
    }
  
    // start Recording
    start(){
      this.recordedBlobs = [];
      let mediaRecorderOption:any = {mimeType : 'video/mp4'};
      this.mediaRecorder = new MediaRecorder(this.stream, mediaRecorderOption);
      this.mediaRecorder.start();
      this.isRecording = !this.isRecording;
      console.log(this.mediaRecorder.state)
      try{
        this.mediaRecorder.ondataavailable = (event:any)=>{  //ondataavailable event from mediaRecorder object
          if(event.data && event.data.size>0){
            this.recordedBlobs.push(event.data);
          }
        }
      }catch{(error:any)=> console.log(error);}
      try{
        this.mediaRecorder.onstop = (event:any)=>{     //onstopevent from mediaRecorder object
          const videoBuffer = new Blob(this.recordedBlobs, {type: 'video/mp4'})
          this.videoBlob = videoBuffer;
          this.sendToServer();
          this.videoUrl = window.URL.createObjectURL(videoBuffer);
          console.log("Video URL", this.videoUrl);
          this.recordVideoElement.src= this.videoUrl;
        }
      } catch{(error:any)=> console.log(error);}
      console.log(this.recordedBlobs);
    }
  
    // stop Recording
    stop(){
      this.mediaRecorder.stop();
      this.isRecording = !this.isRecording;
      this.showVideos=!this.showVideos;
      
    }

    sendToServer(){
      const formData = new FormData();
      formData.append('file', this.videoBlob);
      //post to upload endpoint
      this.apiClient.post(`${this.apiUrl}/upload`, formData).subscribe((response)=>{
        console.log(response);
      });
    }
  }
