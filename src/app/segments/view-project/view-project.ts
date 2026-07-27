import { Component, input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { VideoPlayerComponent } from '../../components/video-player/video-player';

@Component({
  selector: 'app-view-project',
  imports: [RouterLink, MatIconModule, VideoPlayerComponent],
  templateUrl: './view-project.html',
  styleUrl: './view-project.scss',
})
export class ViewProjectComponent {
  id = input.required<string>();
  isMenuOpen = signal(false);
  navLinks = signal<string[]>(['Portfolio']);

  constructor() {}

  toggleMenu() {
    this.isMenuOpen.update((v) => !v);
  }
}
