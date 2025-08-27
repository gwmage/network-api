```typescript
import { Injectable } from '@nestjs/common';
import { NotificationPreferences } from './entities/notification.entity';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';
import { User } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from '../reservation/entities/reservation.entity';

// Initialize Firebase Admin SDK
const serviceAccount = require('../../path/to/your/serviceAccountKey.json'); // Replace with your service account key file path

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  // Configure your email provider settings
  service: 'gmail', // e.g., 'gmail', 'outlook'
  auth: {
    user: 'your_email@gmail.com', // Replace with your email address
    pass: 'your_email_password', // Replace with your email password or app password
  },
});


@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async sendCancellationCompletedNotification(reservation: Reservation, cancellationReason?: string): Promise<void> {
    const userId = reservation.user.id;
    const message = `Your reservation for ${reservation.restaurantName} on ${reservation.reservationDatetime.toLocaleString()} has been cancelled. ${cancellationReason ? `Reason: ${cancellationReason}` : ''}`;

    await this.sendNotification(userId, message);
  }

  async sendNotification(userId: number, message: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['notificationPreferences'] });

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
    try {
      const fcmToken = await this.getFcmToken(userId); // Retrieve FCM token for the user

      if (fcmToken) {
        await admin.messaging().send({
          token: fcmToken,
          notification: {
            title: 'Reservation Update',
            body: message,
          },
        });
      } else {
        console.log(`FCM token not found for user ${userId}`);
      }
    } catch (error) {
      console.error('Error sending push notification:', error);
    }
  }


  private async sendEmailNotification(userId: number, message: string): Promise<void> {

    try {
      const userEmail = await this.getUserEmail(userId);

      if (userEmail) {
          await transporter.sendMail({
              from: 'your_email@gmail.com', // Replace with your email address
              to: userEmail,
              subject: 'Reservation Update',
              text: message,
          });

      } else {
          console.log(`Email not found for user ${userId}`);
      }
  } catch (error) {
      console.error('Error sending email notification:', error);
      // Handle errors appropriately
  }



  }

  private async getFcmToken(userId: number): Promise<string | undefined> {
    // Implement logic to retrieve the user's FCM token from your database
    // This might involve querying a user_devices table or similar
      const user = await this.userRepository.findOne({ where: { id: userId } });
      return user?.fcmToken; // Assuming 'fcmToken' property on User entity
  }


  private async getUserEmail(userId: number): Promise<string | undefined> {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      return user?.email;
  }

  // ... other methods
}
```