import { Location } from '@angular/common';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { VideoPlayerComponent } from '../../components/video-player/video-player';
import { FileItem, ProjectsStoreService } from '../../services/projects-store.service';
import { Project } from '../projects/projects';

@Component({
  selector: 'app-view-project',
  imports: [RouterLink, MatIconModule, VideoPlayerComponent],
  templateUrl: './view-project.html',
  styleUrl: './view-project.scss',
})
export class ViewProjectComponent implements OnInit {
  private projectsStore = inject(ProjectsStoreService);
  public location = inject(Location);

  id = input.required<string>();
  isMenuOpen = signal(false);
  navLinks = signal<string[]>(['Portfolio']);
  selectedProject = signal<Project | undefined>(undefined);
  selectedProjectFiles = signal<FileItem[]>([]);
  selectedFile = signal<FileItem | undefined>(undefined);

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
}
