import { Component, inject, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-player',
  imports: [],
  templateUrl: './video-player.html',
  styleUrl: './video-player.scss',
})
export class VideoPlayerComponent implements OnInit {
  private sanitizer = inject(DomSanitizer);
  safeVideoUrl!: SafeResourceUrl;

  // Paste your copied OneDrive embed link here
  private rawOneDriveUrl =
    'https://1drv.ms/v/c/a1a83378f7e58b4b/IQRTxXqWeoCVTbIqKQO9ThT8AY0MEBQnCWsZQJpJSe5cSu8';

  constructor() {}

  ngOnInit(): void {
    this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.rawOneDriveUrl);
  }
}
