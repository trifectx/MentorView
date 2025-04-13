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
  private TOKEN = '007eJxTYCjbcthilq5T+u3dXmsuSCqwVm6ZY59+Z/eu1TedJ++QmeWswJCUmpZilJaWkmxkamFikJSamJaYmJponmJoaZyYnGpp/Irtd3pDICNDtJULEyMDBIL4LAy5iZl5DAwAsdQg9Q==';
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
      
      // Create and publish local tracks
      this.localTracks = await window.AgoraRTC.createMicrophoneAndCameraTracks();
      
      // Play local video
      this.localTracks[1].play(localVideoContainer);
      
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
      
      // The container will be created by the component
      const containerId = `remote-user-${user.uid}`;
      user.videoTrack.play(containerId);
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
