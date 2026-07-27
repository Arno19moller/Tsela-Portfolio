import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

export interface Project {
  id: number;
  name: string;
  image: string;
}

@Component({
  selector: 'app-projects',
  imports: [MatIconModule, RouterLink],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class ProjectsComponent {
  selectedProject: Project | undefined;
  projects: Project[] = [
    { id: 1, name: '3D Modelling. Motion & Animation Design', image: 'game.png' },
    { id: 2, name: 'Advertising, Social Media & Campaign Design', image: 'advertising.png' },
    { id: 3, name: 'Brand & Visual Identity', image: 'brand.png' },
    { id: 4, name: 'Digital & Web Design', image: 'digital.png' },
    { id: 5, name: 'Environmental Design', image: 'environmental.png' },
    { id: 6, name: 'Illustration & Editorial Design', image: 'illustration.png' },
    { id: 7, name: 'Merch & Product Design', image: 'merch.png' },
    { id: 8, name: 'Packaging Design', image: 'package.png' },
    { id: 9, name: 'Print Design', image: 'print.png' },
  ];

  constructor() {}
}
