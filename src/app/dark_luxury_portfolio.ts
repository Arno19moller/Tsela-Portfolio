import { Component, signal, computed, effect, HostListener, ChangeDetectionStrategy } from '@angular/core';

import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen bg-[#0e0c09] text-[#e6dfd1] font-sans selection:bg-[#c9a84c] selection:text-black">
      
      <nav class="fixed top-0 w-full z-50 transition-all duration-300" [class.bg-[#0e0c09]]="isScrolled()" [class.bg-opacity-80]="isScrolled()" [class.backdrop-blur-md]="isScrolled()">
        <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div class="text-3xl font-['Great_Vibes'] text-[#c9a84c]">Portfolio</div>
          
          <!-- Mobile Menu Button -->
          <button (click)="toggleMenu()" class="md:hidden text-[#c9a84c]">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
          </button>

          <!-- Desktop Nav -->
          <div class="hidden md:flex space-x-8 font-medium">
            @for (link of navLinks; track link) {
              <a href="#{{link.toLowerCase()}}" class="hover:text-[#c9a84c] transition-colors" [class.text-[#c9a84c]]="activeSection() === link.toLowerCase()">{{link}}</a>
            }
          </div>
        </div>
      </nav>

      <!-- Mobile Drawer -->
      @if (isMenuOpen()) {
        <div class="fixed inset-0 z-40 bg-[#0e0c09] md:hidden pt-24 px-6 flex flex-col space-y-6">
          @for (link of navLinks; track link) {
            <a href="#{{link.toLowerCase()}}" (click)="toggleMenu()" class="text-2xl font-['Great_Vibes'] text-[#c9a84c]">{{link}}</a>
          }
        </div>
      }

      <section id="hero" class="h-screen flex flex-col justify-center items-center relative overflow-hidden">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#c9a84c]/10 to-transparent"></div>
        <div class="relative text-center z-10 px-4">
          <h1 class="text-6xl md:text-8xl font-['Great_Vibes'] text-[#c9a84c] mb-6">Eleanora Vance</h1>
          <p class="text-lg md:text-xl text-[#e6dfd1]/80 max-w-2xl mx-auto">Crafting digital experiences where luxury meets minimalism.</p>
          <div class="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <button class="px-8 py-3 bg-[#c9a84c] text-black font-semibold hover:bg-[#b89842] transition-colors">View Projects</button>
            <button class="px-8 py-3 border border-[#c9a84c] text-[#c9a84c] hover:bg-[#c9a84c] hover:text-black transition-colors">Contact Me</button>
          </div>
        </div>
      </section>

      <section id="about" class="py-24 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div class="relative">
          <div class="absolute -bottom-4 -right-4 w-full h-full border-2 border-[#c9a84c]"></div>
          <div class="relative z-10 aspect-[4/5] bg-neutral-800 flex items-center justify-center text-neutral-500 italic">Portrait Image</div>
        </div>
        <div>
          <h2 class="text-5xl font-['Great_Vibes'] text-[#c9a84c] mb-6">My Story</h2>
          <p class="text-lg text-[#e6dfd1]/70 leading-relaxed mb-8">With over a decade of experience in visual communication, I bridge the gap between high-end aesthetic sensibility and functional digital design. I believe in the power of restraint.</p>
          <div class="grid grid-cols-2 gap-8 mb-8">
            <div><div class="text-3xl font-bold text-[#c9a84c]">10+</div><div class="text-sm">Years Exp.</div></div>
            <div><div class="text-3xl font-bold text-[#c9a84c]">150+</div><div class="text-sm">Projects</div></div>
          </div>
          <div class="flex flex-wrap gap-3">
            @for (tag of skills; track tag) {
              <span class="px-3 py-1 border border-[#c9a84c]/30 text-sm rounded-full">{{tag}}</span>
            }
          </div>
        </div>
      </section>

      <section id="works" class="py-24 bg-[#0e0c09]">
        <div class="max-w-7xl mx-auto px-6">
          <h2 class="text-5xl font-['Great_Vibes'] text-[#c9a84c] mb-16 text-center">Selected Works</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#c9a84c]">
            @for (project of projects; track project.id) {
              <div class="group relative bg-[#0e0c09] aspect-square flex items-center justify-center overflow-hidden">
                <span class="text-[#e6dfd1]/20 font-['Great_Vibes'] text-4xl group-hover:text-[#c9a84c] transition-colors">Project {{project.id}}</span>
                <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span class="text-[#c9a84c] font-semibold">View Case Study &rarr;</span>
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <section id="contact" class="py-24 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">
        <div>
          <h2 class="text-5xl font-['Great_Vibes'] text-[#c9a84c] mb-8">Let's Connect</h2>
          <p class="mb-8 text-[#e6dfd1]/70">Open for new opportunities and collaborations. Reach out to start a conversation.</p>
          <div class="space-y-4">
            <p>Email: <a href="mailto:hello@example.com" class="text-[#c9a84c] hover:underline">hello@example.com</a></p>
            <p>Instagram: <a href="#" class="text-[#c9a84c] hover:underline">@eleanoravancedesign</a></p>
          </div>
        </div>
        
        <div class="bg-[#1a1814] p-8 rounded-sm">
          @if (formSubmitted()) {
            <div class="h-64 flex flex-col justify-center items-center text-center">
              <h3 class="text-2xl text-[#c9a84c] mb-4">Message Sent!</h3>
              <p>Thank you for reaching out. I'll get back to you shortly.</p>
            </div>
          } @else {
            <form [formGroup]="contactForm" (ngSubmit)="submitForm()" class="space-y-4">
              <input formControlName="name" type="text" placeholder="Name" class="w-full bg-transparent border-b border-[#c9a84c]/30 focus:border-[#c9a84c] outline-none p-2 transition-colors">
              <input formControlName="email" type="email" placeholder="Email" class="w-full bg-transparent border-b border-[#c9a84c]/30 focus:border-[#c9a84c] outline-none p-2 transition-colors">
              <textarea formControlName="message" placeholder="Message" rows="4" class="w-full bg-transparent border-b border-[#c9a84c]/30 focus:border-[#c9a84c] outline-none p-2 transition-colors"></textarea>
              <button type="submit" [disabled]="contactForm.invalid" class="w-full py-3 bg-[#c9a84c] text-black font-semibold hover:bg-[#b89842] transition-colors disabled:opacity-50">Send</button>
            </form>
          }
        </div>
      </section>

    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Plus+Jakarta+Sans:wght@300;400;600&display=swap');
    :host { display: block; }
    html { scroll-behavior: smooth; }
  `]
})
export class App {
  isMenuOpen = signal(false);
  isScrolled = signal(false);
  activeSection = signal('hero');
  formSubmitted = signal(false);

  navLinks = ['Hero', 'About', 'Works', 'Contact'];
  skills = ['Branding', 'UI/UX', 'Art Direction', 'Typography', 'Web Design'];
  projects = Array.from({ length: 6 }, (_, i) => ({ id: i + 1 }));

  contactForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', Validators.required)
  });

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 50);
    
    // Simple scrollspy logic
    const sections = ['hero', 'about', 'works', 'contact'];
    for (const section of sections) {
      const el = document.getElementById(section);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          this.activeSection.set(section);
        }
      }
    }
  }

  toggleMenu() {
    this.isMenuOpen.update(v => !v);
  }

  submitForm() {
    if (this.contactForm.valid) {
      console.log('Form Submitted', this.contactForm.value);
      this.formSubmitted.set(true);
    }
  }
}