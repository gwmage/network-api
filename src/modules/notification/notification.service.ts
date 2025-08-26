```typescript
import { Injectable } from '@nestjs/common';
import { NotificationPreferences } from './entities/notification.entity';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';
import { User } from '../user/entities/user.entity'; // Import User entity
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


// Initialize Firebase Admin SDK (ensure you have set up the service account credentials)
// ... (Firebase initialization from previous example)

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>, // Inject User repository
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
    // ... (Implementation from previous example)
  }

  private async sendEmailNotification(userId: number, message: string): Promise<void> {
    // ... (Implementation from previous example)
  }


  private async getUserFCMToken(userId: number): Promise<string | undefined> {
    return this.userRepository.findOne({ where: { id: userId } }).then(user => user?.fcmToken);

  }

  private async getUserEmail(userId: number): Promise<string | undefined> {
    return this.userRepository.findOne({ where: { id: userId } }).then(user => user?.email);


  }


  // ... (Rest of the existing code)

}

```