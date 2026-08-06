import { Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AboutComponent } from '../segments/about/about';
import { ContactComponent } from '../segments/contact/contact';
import { HeroComponent } from '../segments/hero/hero';
import { NavigationComponent } from '../segments/navigation/navigation';
import { ProjectsComponent } from '../segments/projects/projects';

@Component({
  selector: 'app-home',
  imports: [
    MatIconModule,
    NavigationComponent,
    HeroComponent,
    AboutComponent,
    ProjectsComponent,
    ContactComponent,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {
  activeSection = signal('hero');
  navLinks = ['INTRO', 'ABOUT', 'WORKS', 'CONTACT'];

  constructor() {}
}
