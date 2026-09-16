import { Component, HostListener, signal } from '@angular/core';

@Component({
  selector: 'app-navigation',
  imports: [],
  templateUrl: './navigation.html',
  styleUrl: './navigation.scss',
})
export class NavigationComponent {
  isScrolled = signal(false);
  isMenuOpen = signal(false);

  navLinks = signal<string[]>(['INTRO', 'ABOUT', 'WORKS', 'CONTACT']);
  activeSection = signal<string>('hero');

  constructor() {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 150);

    // Simple scrollspy logic
    const sections = this.navLinks().map((link) => link.toLocaleLowerCase());
    for (const section of sections) {
      const el = document.getElementById(section);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 400 && rect.bottom >= 10) {
          this.activeSection.set(section);
        }
      }
    }
  }

  toggleMenu() {
    this.isMenuOpen.update((v) => !v);
  }
}
