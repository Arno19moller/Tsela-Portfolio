import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { AboutService } from '../../services/about.service';
import { ProjectsStoreService } from '../../services/projects-store.service';
import { AwardsDialog } from './awards-dialog/awards-dialog';

@Component({
  selector: 'app-about',
  imports: [RouterModule, MatTooltipModule, NgxSkeletonLoaderModule],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class AboutComponent {
  readonly dialog = inject(MatDialog);
  readonly aboutService = inject(AboutService);
  readonly projectsService = inject(ProjectsStoreService);

  aboutBody = this.aboutService.aboutBody;
  skills = this.aboutService.skills;
  projectsResource = this.projectsService.projectsResource;

  constructor() {}

  openAwards(): void {
    this.dialog.open(AwardsDialog, { width: '90%', height: '80%' });
  }
}
