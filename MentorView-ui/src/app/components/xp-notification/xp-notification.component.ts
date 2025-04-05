import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-xp-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './xp-notification.component.html',
  styleUrls: ['./xp-notification.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0, transform: 'translateY(20px)' })),
      transition(':enter', [
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-20px)' }))
      ])
    ])
  ]
})
export class XpNotificationComponent implements OnInit {
  @Input() xpAmount: number = 0;
  @Input() rating: number = 0;
  @Input() difficulty: number = 1.0;
  isVisible: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.isVisible = true;
    // Automatically dismiss after 5 seconds
    setTimeout(() => {
      this.isVisible = false;
    }, 5000);
  }
}
