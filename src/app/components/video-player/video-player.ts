import { Component, input, OnInit, signal } from '@angular/core';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../firebase.config';

@Component({
  selector: 'app-video-player',
  imports: [],
  templateUrl: './video-player.html',
  styleUrl: './video-player.scss',
})
export class VideoPlayerComponent implements OnInit {
  url = input.required<string>();
  videoUrl = signal<string>('');

  constructor() {}

  ngOnInit(): void {
    const videoRef = ref(storage, this.url());

    getDownloadURL(videoRef)
      .then((url) => {
        this.videoUrl.set(url);
      })
      .catch((error) => {
        console.error('Error retrieving video URL:', error);
      });
  }
}
