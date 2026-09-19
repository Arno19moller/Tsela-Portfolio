import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ProjectsStoreService } from '../../services/projects-store.service';

export interface Project {
  id: string;
  projectId: string;
  name: string;
  image: string;
}

@Component({
  selector: 'app-projects',
  imports: [CommonModule, RouterLink, MatIconModule, NgxSkeletonLoaderModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class ProjectsComponent {
  private projectsStore = inject(ProjectsStoreService);

  selectedProject: Project | undefined;
  projectsResource = this.projectsStore.projectsResource;

  constructor() {}
}
