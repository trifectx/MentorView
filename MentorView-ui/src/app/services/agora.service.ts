import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// Define global AgoraRTC type
declare global {
  var AgoraRTC: any;
}

@Injectable({
  providedIn: 'root'
})
export class AgoraService {
  // Agora credentials
  private APP_ID = 'befd2ffdc25840beafaaea7d193ace93';
  private TOKEN = '007eJxTYEgy3iG6+IhuW+P3lcveiG+53q/yNPzVJr6ndxf4hq1w+3lTgSEpNS3FKC0tJdnI1MLEICk1MS0xMTXRPMXQ0jgxOdXSOECTIaMhkJFhS28EIyMDBIL4LAy5iZl5DAwAP/oieA==';
  private CHANNEL = 'main';

  public client: any = null;
  public localTracks: any[] = [];
  public remoteUsers: {[uid: string]: any} = {};
  
  // Connection state observable
  private _connectionState = new BehaviorSubject<string>('DISCONNECTED');
  public connectionState$ = this._connectionState.asObservable();

  constructor() { 
    // Wait for document to be fully loaded before initializing
    if (document.readyState === 'complete') {
      this.initClient();
    } else {
      window.addEventListener('load', () => {
        this.initClient();
      });
    }
  }

  private initClient() {
    try {
      // Check if AgoraRTC is available globally
      if (typeof window.AgoraRTC === 'undefined') {
        console.error('AgoraRTC not loaded. Make sure the script is included in index.html');
        
        // Create a script element to load AgoraRTC dynamically as a fallback
        const script = document.createElement('script');
        script.src = 'https://download.agora.io/sdk/release/AgoraRTC_N-4.17.2.js';
        script.async = true;
        script.onload = () => {
          console.log('AgoraRTC loaded dynamically');
          this.createClient();
        };
        document.head.appendChild(script);
        return;
      }
      
      this.createClient();
    } catch (error) {
      console.error('Error initializing Agora client:', error);
    }
  }
  
  private createClient() {
    try {
      this.client = window.AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
      console.log('Agora client initialized');
    } catch (error) {
      console.error('Error creating Agora client:', error);
    }
  }

  /**
   * Join and display local stream
   */
  public async joinAndDisplayLocalStream(localVideoContainer: string) {
    try {
      if (!this.client) {
        throw new Error('Agora client not initialized');
      }
      
      this._connectionState.next('CONNECTING');

      // Set up event listeners
      this.client.on('user-published', this.handleUserJoined.bind(this));
      this.client.on('user-left', this.handleUserLeft.bind(this));
      
      // Join the channel
      const uid = await this.client.join(this.APP_ID, this.CHANNEL, this.TOKEN, null);
      console.log('Joined channel with UID:', uid);
      
      // Create and publish local tracks with constraints to keep size small
      this.localTracks = await window.AgoraRTC.createMicrophoneAndCameraTracks(
        {}, // Audio config
        {
          encoderConfig: {
            width: 240,
            height: 180,
            frameRate: 15,
            bitrateMin: 200,
            bitrateMax: 500
          },
          optimizationMode: 'detail', // prioritize image quality over motion
          facingMode: 'user'
        }
      );
      
      // Force strict playback options for small size
      const playerOptions = {
        fit: 'cover',
        width: '240px',
        height: '180px',
      };
      
      // Play local video with specific dimensions
      const videoTrack = this.localTracks[1];
      videoTrack.play(localVideoContainer, playerOptions);
      
      // Extra DOM manipulation to ensure correct size
      setTimeout(() => {
        // Find all video elements in the specified container and force size
        const playerElement = document.getElementById(localVideoContainer);
        if (playerElement) {
          // Apply strict styling directly
          playerElement.style.width = '240px';
          playerElement.style.height = '180px';
          playerElement.style.maxWidth = '240px';
          playerElement.style.maxHeight = '180px';
          playerElement.style.overflow = 'hidden';
          
          // Find any video elements inside and force size
          const videoElements = playerElement.getElementsByTagName('video');
          for (let i = 0; i < videoElements.length; i++) {
            videoElements[i].style.width = '240px';
            videoElements[i].style.height = '180px';
            videoElements[i].style.objectFit = 'cover';
          }
        }
      }, 100);
      
      // Publish local tracks
      await this.client.publish(this.localTracks);
      console.log('Published local tracks');
      
      this._connectionState.next('CONNECTED');
      
      return uid;
    } catch (error) {
      console.error('Error joining channel:', error);
      this._connectionState.next('ERROR');
      throw error;
    }
  }

  /**
   * Handle when a remote user joins
   */
  private async handleUserJoined(user: any, mediaType: 'audio' | 'video') {
    // Add user to remote users
    if (!this.remoteUsers[user.uid]) {
      this.remoteUsers[user.uid] = { uid: user.uid };
    }
    
    // Subscribe to the user
    await this.client.subscribe(user, mediaType);
    console.log('Subscribed to', mediaType, 'from user', user.uid);
    
    // Play the user's media
    if (mediaType === 'video') {
      // Store reference instead of the actual track to avoid type errors
      this.remoteUsers[user.uid].videoTrack = user.videoTrack;
      
      // Find a free container among our pre-created ones
      let slotNumber = 1;
      while (slotNumber <= 3) {
        const targetContainer = document.getElementById(`remote-user-${slotNumber}`);
        if (targetContainer && !targetContainer.firstChild) {
          break;
        }
        slotNumber++;
      }
      
      // If all slots are filled, reuse the last one
      if (slotNumber > 3) slotNumber = 3;
      
      const containerId = `remote-user-${slotNumber}`;
      console.log(`Playing remote user ${user.uid} video in container ${containerId}`);
      
      // Play with specific dimensions
      const playerOptions = {
        fit: 'cover',
        width: '240px',
        height: '180px',
      };
      
      user.videoTrack.play(containerId, playerOptions);
      
      // Extra DOM manipulation to ensure correct size and position
      setTimeout(() => {
        const playerElement = document.getElementById(containerId);
        if (playerElement) {
          // Ensure the player element is properly sized and positioned
          playerElement.style.width = '240px';
          playerElement.style.height = '180px';
          playerElement.style.maxWidth = '240px';
          playerElement.style.maxHeight = '180px';
          playerElement.style.overflow = 'hidden';
          playerElement.style.position = 'relative';
          
          // Find the actual video element created by Agora
          const videoElements = playerElement.getElementsByTagName('video');
          for (let i = 0; i < videoElements.length; i++) {
            videoElements[i].style.width = '240px';
            videoElements[i].style.height = '180px';
            videoElements[i].style.objectFit = 'cover';
            videoElements[i].style.position = 'absolute';
            videoElements[i].style.top = '0';
            videoElements[i].style.left = '0';
          }
          
          // Find any Agora player elements and ensure proper styling
          const agoraElements = document.querySelectorAll('[id^="agora-video-player"]');
          agoraElements.forEach(el => {
            (el as HTMLElement).style.width = '240px';
            (el as HTMLElement).style.height = '180px';
            (el as HTMLElement).style.position = 'absolute';
            (el as HTMLElement).style.top = '0';
            (el as HTMLElement).style.left = '0';
          });
        }
      }, 100);
    } else if (mediaType === 'audio') {
      // Store reference instead of the actual track to avoid type errors
      this.remoteUsers[user.uid].audioTrack = user.audioTrack;
      
      user.audioTrack.play();
    }
  }

  /**
   * Handle when a user leaves
   */
  private handleUserLeft(user: any) {
    console.log('User left:', user.uid);
    
    // Remove user from remote users
    delete this.remoteUsers[user.uid];
  }

  /**
   * Leave and remove local stream
   */
  public async leaveAndRemoveLocalStream() {
    try {
      if (!this.client) {
        return;
      }
      
      // Stop and close local tracks
      for (const track of this.localTracks) {
        track.stop();
        track.close();
      }
      
      // Leave the channel
      await this.client.leave();
      console.log('Left channel successfully');
      
      // Reset state
      this.localTracks = [];
      this.remoteUsers = {};
      this._connectionState.next('DISCONNECTED');
    } catch (error) {
      console.error('Error leaving channel:', error);
      throw error;
    }
  }

  /**
   * Toggle microphone
   * @returns A boolean indicating whether the microphone is now muted
   */
  public async toggleMic(): Promise<boolean> {
    if (!this.localTracks || this.localTracks.length === 0) return false;
    
    const audioTrack = this.localTracks[0];
    const currentState = audioTrack.muted;
    
    await audioTrack.setMuted(!currentState);
    console.log('Microphone muted:', !currentState);
    
    return !currentState; // Return new state
  }

  /**
   * Toggle camera
   * @returns A boolean indicating whether the camera is now muted
   */
  public async toggleCamera(): Promise<boolean> {
    if (!this.localTracks || this.localTracks.length < 2) return false;
    
    const videoTrack = this.localTracks[1];
    const currentState = videoTrack.muted;
    
    await videoTrack.setMuted(!currentState);
    console.log('Camera muted:', !currentState);
    
    return !currentState; // Return new state
  }
}
