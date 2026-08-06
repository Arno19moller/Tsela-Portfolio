import { CommonModule, Location } from '@angular/common';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { getDownloadURL, ref } from 'firebase/storage';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { VideoPlayerComponent } from '../../components/video-player/video-player';
import { storage } from '../../firebase.config';
import { FileItem, ProjectsStoreService } from '../../services/projects-store.service';
import { Project } from '../projects/projects';

@Component({
  selector: 'app-view-project',
  imports: [
    CommonModule,
    RouterLink,
    MatIconModule,
    VideoPlayerComponent,
    NgxExtendedPdfViewerModule,
  ],
  templateUrl: './view-project.html',
  styleUrl: './view-project.scss',
})
export class ViewProjectComponent implements OnInit {
  private projectsStore = inject(ProjectsStoreService);
  public location = inject(Location);
  public sanitizer = inject(DomSanitizer);

  id = input.required<string>();
  isMenuOpen = signal(false);
  navLinks = signal<string[]>(['Portfolio']);
  selectedProject = signal<Project | undefined>(undefined);
  selectedProjectFiles = signal<FileItem[]>([]);
  selectedFile = signal<FileItem | undefined>(undefined);
  pdfLink = signal<string>(');');

  constructor() {}

  async ngOnInit(): Promise<void> {
    this.selectedProject.set(await this.projectsStore.getProject(this.id()));
    this.selectedProjectFiles.set(
      await this.projectsStore.getProjectFiles(this.selectedProject()!.id),
    );
  }

  toggleMenu() {
    this.isMenuOpen.update((v) => !v);
  }

  closeFile() {
    this.selectedFile.set(undefined);
  }

  openFile(file: FileItem) {
    this.selectedFile.set(file);
    if (file.type === 'pdf') {
      this.getPdfLink(file.link);
    }
  }

  getIconBg(type: FileItem['type']): string {
    switch (type) {
      case 'pdf':
        return 'bg-rose-100 dark:bg-rose-950/80';
      case 'video':
        return 'bg-red-100 dark:bg-red-950/80';
      case 'image':
        return 'bg-emerald-100 dark:bg-emerald-950/80';
      default:
        return 'bg-amber-100 dark:bg-amber-950/80';
    }
  }

  async getPdfLink(link: string): Promise<void> {
    const pdfRef = ref(storage, link);
    const downloadUrl = await getDownloadURL(pdfRef);

    const response = await fetch(downloadUrl);
    const blob = await response.blob();

    this.getBase64(blob).then((value) => {
      this.pdfLink.set(value);
    });
  }

  getBase64(blob: Blob) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        // Returns format: "data:application/pdf;base64,JVBERi0xLj..."
        const base64Data = reader.result as string;
        resolve(base64Data);
      };

      reader.onerror = (error) => reject(error);

      // Read the blob as a Base64 Data URL
      reader.readAsDataURL(blob);
    });
  }

  openFullscreen(elem: any) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  }
}
