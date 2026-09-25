import { CommonModule } from '@angular/common';
import { Component, inject, signal, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { Pdf } from '../../components/pdf/pdf';
import { ProjectsStoreService } from '../../services/projects-store.service';

export interface Project {
  id: string;
  projectId: string;
  name: string;
  image: string;
  isActive: boolean;
}

@Component({
  selector: 'app-projects',
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogClose,
    NgxSkeletonLoaderModule,
    Pdf,
  ],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class ProjectsComponent {
  private projectsStore = inject(ProjectsStoreService);
  readonly dialog = inject(MatDialog);

  allProjectsPopup = viewChild<any>('allProjectsPopup');

  selectedProject: Project | undefined;
  projectsResource = this.projectsStore.projectsResource;
  isLoading = signal<boolean>(false);
  allPdfLink = signal<string>(
    'https://firebasestorage.googleapis.com/v0/b/tsela-portfolio.firebasestorage.app/o/PDF%2FComprehensive%20Projects.pdf?alt=media&token=02997fb7-deb8-4377-8f26-7f689f2568a0',
  );

  constructor() {}

  async openAllProjects(): Promise<void> {
    this.isLoading.set(true);
    this.dialog.open(this.allProjectsPopup(), {
      width: '90vw',
      maxWidth: '1000px',
      minWidth: '320px',
      height: '80%',
    });
    await new Promise((resolve) => setTimeout(resolve, 1500));
    this.isLoading.set(false);
  }
}
