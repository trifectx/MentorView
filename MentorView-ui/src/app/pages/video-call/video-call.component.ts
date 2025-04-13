import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgoraService } from '../../services/agora.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-video-call',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.css']
})
export class VideoCallComponent implements OnInit, OnDestroy {
  @ViewChild('localVideo') localVideoRef!: ElementRef;
  
  connectionState: string = 'DISCONNECTED';
  remoteUsers: Record<string, any> = {};
  
  // Subscriptions
  private connectionStateSubscription?: Subscription;
  
  // UI state
  isAudioMuted: boolean = false;
  isVideoMuted: boolean = false;
  isJoining: boolean = false;
  
  constructor(private agoraService: AgoraService) {}
  
  ngOnInit(): void {
    // Subscribe to connection state changes
    this.connectionStateSubscription = this.agoraService.connectionState$.subscribe(state => {
      this.connectionState = state;
    });
    
    // Set up remote users
    this.remoteUsers = this.agoraService.remoteUsers;
  }
  
  ngOnDestroy(): void {
    // Clean up subscriptions
    if (this.connectionStateSubscription) {
      this.connectionStateSubscription.unsubscribe();
    }
    
    // Leave channel if connected
    this.leaveCall();
  }
  
  /**
   * Join the video call
   */
  async joinCall(): Promise<void> {
    if (this.connectionState !== 'DISCONNECTED') return;
    
    try {
      this.isJoining = true;
      
      // Join the channel with local video container ID
      await this.agoraService.joinAndDisplayLocalStream('local-video');
      
      this.isJoining = false;
    } catch (error) {
      console.error('Error joining call:', error);
      this.isJoining = false;
    }
  }
  
  /**
   * Leave the video call
   */
  async leaveCall(): Promise<void> {
    try {
      await this.agoraService.leaveAndRemoveLocalStream();
    } catch (error) {
      console.error('Error leaving call:', error);
    }
  }
  
  /**
   * Toggle microphone
   */
  async toggleMic(): Promise<void> {
    try {
      this.isAudioMuted = await this.agoraService.toggleMic();
    } catch (error) {
      console.error('Error toggling microphone:', error);
    }
  }
  
  /**
   * Toggle camera
   */
  async toggleCamera(): Promise<void> {
    try {
      this.isVideoMuted = await this.agoraService.toggleCamera();
    } catch (error) {
      console.error('Error toggling camera:', error);
    }
  }
  
  /**
   * Get remote user IDs
   */
  getRemoteUserIds(): string[] {
    return Object.keys(this.remoteUsers);
  }
}
