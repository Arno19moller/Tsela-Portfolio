import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { register } from 'swiper/element/bundle';
import { FileItem } from '../../services/projects-store.service';
import { Pdf } from '../pdf/pdf';
import { VideoPlayerComponent } from '../video-player/video-player';

register();

@Component({
  selector: 'app-coverflow-gallery',
  imports: [VideoPlayerComponent, NgxExtendedPdfViewerModule, MatIconModule, Pdf],
  templateUrl: './coverflow-gallery.html',
  styleUrl: './coverflow-gallery.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CoverflowGallery {
  files = input.required<FileItem[]>();

  galleryFiles = computed(() => {
    return this.files().filter((f) => f.type !== 'pdf');
  });

  constructor() {}
}
