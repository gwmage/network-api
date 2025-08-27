```typescript
import { Injectable } from '@nestjs/common';
import { NotificationPreferences } from './entities/notification.entity';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';
import { User } from '../user/entities/user.entity'; // Import User entity
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from '../reservation/entities/reservation.entity'; // Import Reservation entity


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


  async sendCancellationCompletedNotification(reservation: Reservation, cancellationReason?: string): Promise<void> {
    const userId = reservation.user.id; // Assuming reservation entity has a user property
    const message = `Your reservation for ${reservation.restaurantName} on ${reservation.reservationDatetime.toLocaleString()} has been cancelled. ${cancellationReason ? `Reason: ${cancellationReason}` : ''}`;

    await this.sendNotification(userId, message);
  }



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

  // ... (rest of the code remains unchanged)
}

```