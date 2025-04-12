import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
  standalone: true
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: Date | string | number): string {
    if (!value) return 'just now';

    // Convert input to Date object
    const date = value instanceof Date ? value : new Date(value);
    const now = new Date();
    
    if (isNaN(date.getTime())) {
      return 'invalid date';
    }

    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 5) {
      return 'just now';
    }
    if (seconds < 60) {
      return `${seconds} second${seconds === 1 ? '' : 's'} ago`;
    }
    if (minutes < 60) {
      return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    }
    if (hours < 24) {
      return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    }
    if (days < 30) {
      return `${days} day${days === 1 ? '' : 's'} ago`;
    }
    if (months < 12) {
      return `${months} month${months === 1 ? '' : 's'} ago`;
    }
    return `${years} year${years === 1 ? '' : 's'} ago`;
  }
}
