import { Injectable } from '@angular/core';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../firebase.config';

interface EmailResponse {
  success: boolean;
  message: string;
}

interface EmailData {
  recipientEmail: string;
  name: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor() {}

  async sendEmail(name: string, email: string, message: string): Promise<EmailResponse> {
    const data: EmailData = {
      name: 'Tsela Trails Enquiry',
      recipientEmail: 'admin@tselatrails.com',
      message: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
    };

    const callSendEmail = httpsCallable<EmailData, EmailResponse>(functions, 'sendContactEmail');

    try {
      const result = await callSendEmail(data);
      return result.data;
    } catch (error: any) {
      console.error('Error calling Cloud Function:', error);
      throw new Error(error.message || 'Unknown error occurred while sending email.');
    }
  }
}
