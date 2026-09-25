import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { register } from 'swiper/element/bundle';
import { FileItem } from '../../services/projects-store.service';
import { VideoPlayerComponent } from '../video-player/video-player';

register();

@Component({
  selector: 'app-coverflow-gallery',
  imports: [VideoPlayerComponent, NgxExtendedPdfViewerModule, MatIconModule],
  templateUrl: './coverflow-gallery.html',
  styleUrl: './coverflow-gallery.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CoverflowGallery {
  files = input.required<FileItem[]>();
  showText = input<boolean>(false);

  /** Index of the slide currently "long-pressed" on mobile */
  activeSlideIndex = signal<number | null>(null);

  private longPressTimer: ReturnType<typeof setTimeout> | null = null;

  galleryFiles = computed(() => {
    return this.files().filter((f) => f.type !== 'pdf');
  });

  onTouchStart(index: number): void {
    this.longPressTimer = setTimeout(() => {
      this.activeSlideIndex.set(index);
    }, 500);
  }

  onTouchEnd(): void {
    if (this.longPressTimer) {
      clearTimeout(this.longPressTimer);
      this.longPressTimer = null;
    }
  }

  onTouchMove(): void {
    // Cancel long press if the user scrolls / swipes
    this.onTouchEnd();
  }

  dismissOverlay(event: Event): void {
    event.stopPropagation();
    this.activeSlideIndex.set(null);
  }

  constructor() {}
}
