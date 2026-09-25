import { Component, inject, resource, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Gallery as GalleryComponent } from '../../../components/gallery/gallery';
import { FileService } from '../../../services/file.service';

@Component({
  selector: 'app-awards-dialog',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatProgressSpinnerModule,
    GalleryComponent,
  ],
  templateUrl: './awards-dialog.html',
  styleUrl: './awards-dialog.scss',
})
export class AwardsDialog {
  readonly fileService = inject(FileService);

  folderPath = signal<string>('Awards');
  images = signal<string[]>([]);

  galleryResource = resource({
    params: () => ({ path: this.folderPath() }),
    loader: async ({ params }) => {
      if (!params.path) return [];
      return this.fileService.getFileBlobsFromPath(params.path, 'Awards');
    },
  });

  constructor() {}
}
