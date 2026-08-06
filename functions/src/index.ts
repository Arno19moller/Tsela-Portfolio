/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { setGlobalOptions } from 'firebase-functions';
import { CallableRequest } from 'firebase-functions/https';
import { defineSecret } from 'firebase-functions/params';
import * as functions from 'firebase-functions/v2';
import { EmailParams, MailerSend, Recipient, Sender } from 'mailersend';

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

setGlobalOptions({ maxInstances: 2 });

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

interface EmailData {
  recipientEmail: string;
  name: string;
  message: string;
}

const MAILERSEND_API_KEY_SECRET = defineSecret('MAILERSEND_API_KEY');
const SENDER_EMAIL = 'portfolio.enquiry@tselatrails.com';
const SENDER_NAME = 'Tsela Trails Portfolio';

export const sendContactEmail = functions.https.onCall(
  {
    maxInstances: 2,
    secrets: [MAILERSEND_API_KEY_SECRET],
  },
  async (data: CallableRequest<EmailData>) => {
    const { recipientEmail, name, message } = data.data;

    const apiKey = process.env.MAILERSEND_API_KEY;
    if (!apiKey) return;

    const mailersend = new MailerSend({ apiKey: apiKey });

    if (!recipientEmail || !name || !message) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Recipient email, subject, and message are required.',
      );
    }

    try {
      const sender = new Sender(SENDER_EMAIL, SENDER_NAME);
      const recipients = [new Recipient(recipientEmail as string)];

      const emailParams = new EmailParams()
        .setFrom(sender)
        .setTo(recipients)
        .setSubject('Tsela Portfolio Enquiry')
        .setHtml(
          `
        <p><strong>You received a message from Tsela Photograhy:</strong></p>
        <p>${message}</p>
        <hr>
        <p>Recipient: ${name}</p>
        <p>Recipient email: ${recipientEmail}</p>
      `,
        )
        .setText(
          `You received a message from Tsela Trails:\n${message}\n
          Recipient: ${name}\n
          Recipient email: ${recipientEmail}`,
        );

      await mailersend.email.send(emailParams);

      return {
        success: true,
        message: 'Email successfully queued with MailerSend.',
      };
    } catch (error) {
      console.error('MailerSend API Error:', error);

      throw new functions.https.HttpsError(
        'internal',
        'An error occurred while sending the email on the server.',
        (error as Error).message,
      );
    }
  },
);
