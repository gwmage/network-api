```typescript
import { Injectable } from '@nestjs/common';
import { NotificationPreferences } from './entities/notification.entity';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';
import { User } from '../user/entities/user.entity'; // Import User entity
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


// Initialize Firebase Admin SDK
const serviceAccount = require('../../path/to/your/serviceAccountKey.json'); // Replace with your service account key file path

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}


  async sendNotification(userId: number, message: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['notificationPreferences'] }); // Fetch user with notification preferences

    if (!user) {
      console.log(`User ${userId} not found.`);
      return;
    }

    const preferences = user.notificationPreferences;


    if (preferences.push) {

      await this.sendPushNotification(userId, message);
    }
    if (preferences.email) {
      await this.sendEmailNotification(userId, message);

    }

  }

  private async sendPushNotification(userId: number, message: string): Promise<void> {
    const userFCMToken = await this.getUserFCMToken(userId);

    if (userFCMToken) {
      const payload: admin.messaging.MessagingPayload = {
        notification: {
          title: 'New Notification',
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
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Example: using Gmail
      auth: {
        user: 'your_email@gmail.com', // Replace with your email
        pass: 'your_email_password', // Replace with your email password or app password
      },
    });

    const userEmail = await this.getUserEmail(userId);

    if (userEmail) {
      const mailOptions: nodemailer.SendMailOptions = {
        from: 'your_email@gmail.com', // Replace with your email
        to: userEmail,
        subject: 'New Notification',
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

  private async getUserFCMToken(userId: number): Promise<string | undefined> {
    return this.userRepository.findOne({ where: { id: userId }, relations: ['notificationPreferences'] }).then(user => user?.notificationPreferences?.fcmToken);
  }

  private async getUserEmail(userId: number): Promise<string | undefined> {
    return this.userRepository.findOne({ where: { id: userId } }).then(user => user?.email);

  }
}

```