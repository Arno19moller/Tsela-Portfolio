import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class ContactComponent {
  private emailService = inject(EmailService);

  formSubmitted = signal(false);
  contactForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', Validators.required),
  });
  formStatus = signal<'idle' | 'submitting' | 'success' | 'fail'>('idle');

  constructor() {}

  submitForm() {
    this.contactForm.markAllAsTouched();
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.formStatus.set('submitting');

    const name = this.contactForm.controls['name'].value;
    const email = this.contactForm.controls['email'].value;
    const message = this.contactForm.controls['message'].value;
    this.emailService.sendEmail(name!, email!, message!).then((response) => {
      if (response.success) {
        this.formStatus.set('success');
        this.contactForm.reset();
        setTimeout(() => {
          this.formStatus.set('idle');
        }, 10000);
      } else {
        this.formStatus.set('fail');
      }
    });
  }

  resetForm() {
    this.formStatus.set('idle');
  }
}
