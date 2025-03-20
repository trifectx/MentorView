import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml',
  standalone: true
})
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    // Convert line breaks to <br> tags for better display
    const withLineBreaks = value.replace(/\n/g, '<br>');
    
    // Detect and style scenario and instructions sections
    const formattedText = withLineBreaks
      .replace(/Scenario:/g, '<strong class="scenario-title">Scenario:</strong>')
      .replace(/Instructions:/g, '<strong class="instructions-title">Instructions:</strong>')
      // Format numbered list items (1., 2., etc.)
      .replace(/(\d+\.\s)(.+?)(<br>|$)/g, '<div class="instruction-item">$1$2</div>$3');

    return this.sanitizer.bypassSecurityTrustHtml(formattedText);
  }
}
