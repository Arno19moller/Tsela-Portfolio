import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  ElementRef,
  input,
  viewChild,
} from '@angular/core';
import { register } from 'swiper/element/bundle';
import { StorageFileItem } from '../../services/file.service';

register();

@Component({
  selector: 'app-gallery',
  imports: [],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Gallery {
  files = input.required<StorageFileItem[]>();

  mainSwiper = viewChild<ElementRef>('mainSwiper');
  thumbsSwiper = viewChild<ElementRef>('thumbsSwiper');

  constructor() {
    effect(() => {
      const filesList = this.files();
      const mainEl = this.mainSwiper()?.nativeElement;
      const thumbsEl = this.thumbsSwiper()?.nativeElement;

      if (filesList.length > 0 && mainEl && thumbsEl) {
        setTimeout(() => {
          Object.assign(thumbsEl, {
            loop: true,
            spaceBetween: 10,
            slidesPerView: 4,
            freeMode: true,
            watchSlidesProgress: true,
          });
          thumbsEl.initialize();

          Object.assign(mainEl, {
            loop: true,
            spaceBetween: 10,
            navigation: true,
            thumbs: {
              swiper: thumbsEl,
            },
          });
          mainEl.initialize();
        });
      }
    });
  }
}
