import { Component, inject, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { ProjectsStoreService } from '../../services/projects-store.service';

export interface Project {
  id: string;
  projectId: string;
  name: string;
  image: string;
}

@Component({
  selector: 'app-projects',
  imports: [MatIconModule, RouterLink],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class ProjectsComponent implements OnInit {
  private projectsStore = inject(ProjectsStoreService);

  selectedProject: Project | undefined;
  projects = signal<Project[]>([]);

  constructor() {}

  async ngOnInit(): Promise<void> {
    this.projects.set(await this.projectsStore.getProjects());
  }
}
