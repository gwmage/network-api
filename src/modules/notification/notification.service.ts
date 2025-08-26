```typescript
import { Injectable } from '@nestjs/common';
import { NotificationPreferences } from './entities/notification.entity';
import * as admin from 'firebase-admin'; // Import Firebase Admin SDK
import * as nodemailer from 'nodemailer'; // Import Nodemailer

// Initialize Firebase Admin SDK (ensure you have set up the service account credentials)
const serviceAccount = require('../../path/to/your/serviceAccountKey.json'); // Replace with your service account key file path

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

@Injectable()
export class NotificationService {
  // ... (Existing code)

  private async sendPushNotification(userId: number, message: string): Promise<void> {
    // Fetch the user's FCM token from your database based on userId
    const userFCMToken = await this.getUserFCMToken(userId); // Implement this function

    if (userFCMToken) {
      const payload: admin.messaging.MessagingPayload = {
        notification: {
          title: 'New Notification', // Customize the title
          body: message,
        },
        data: {
            // You can add custom data here if needed.
        }
      };

      try {
        await admin.messaging().sendToDevice(userFCMToken, payload);
        console.log('Push notification sent successfully!');
      } catch (error) {
        console.error('Error sending push notification:', error);
      }
    } else {
      console.log(`User ${userId} does not have an FCM token.`);
    }


  }

  private async sendEmailNotification(userId: number, message: string): Promise<void> {
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
        // Configure your email provider (e.g., Gmail, SendGrid, etc.)
      service: 'gmail', // Example: using Gmail
      auth: {
        user: 'your_email@gmail.com', // Replace with your email
        pass: 'your_email_password', // Replace with your email password or app password
      },
    });


    const userEmail = await this.getUserEmail(userId); // Implement this function

    if (userEmail) {

      const mailOptions: nodemailer.SendMailOptions = {
        from: 'your_email@gmail.com', // Replace with your email
        to: userEmail,
        subject: 'New Notification', // Customize the subject
        text: message,
      };

        try {
          await transporter.sendMail(mailOptions);
          console.log('Email notification sent successfully!');

        }
        catch (error) {
          console.error('Error sending email notification:', error);

        }
    } else {

      console.log(`User ${userId} does not have a registered email.`);

    }


  }



  // Dummy implementations for retrieving user's FCM token and email. Replace these with your actual database queries.
  private async getUserFCMToken(userId: number): Promise<string | undefined> {
    // Replace this with your database logic to fetch the FCM token for the given userId
    // Example:
    // return this.userRepository.findOne({ where: { id: userId } }).then(user => user?.fcmToken);
    return 'your_fcm_token'; // Replace with a real token for testing
  }

  private async getUserEmail(userId: number): Promise<string | undefined> {

    return "test@test.com"; // Replace with user's actual email

  }

  // ... (Rest of the existing code)
}

```