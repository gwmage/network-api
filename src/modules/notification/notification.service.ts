```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {
  async getNotificationPreferences(userId: number): Promise<any> {
    // Replace with your actual database logic to fetch preferences for the given userId
    console.log(`Fetching notification preferences for user ${userId}`);
    // Example:
    return { push: true, email: false }; 
  }

  async saveNotificationPreferences(userId: number, push: boolean, email: boolean): Promise<void> {
    // Implement your database logic here to save preferences for the given userId
    console.log(`Saving preferences for user ${userId}: push=${push}, email=${email}`);
  }

  async createNotification(userId: number, message: string, type: string): Promise<void> {
      // Implement your notification creation logic here (e.g., saving to a database)
      console.log(`Creating notification for user ${userId}: message=${message}, type=${type}`);

      const preferences = await this.getNotificationPreferences(userId);

      if (type === 'push' && preferences.push) {
        // Send push notification using a push notification service (e.g., Firebase Cloud Messaging)
        this.sendPushNotification(userId, message);
      }

      if (type === 'email' && preferences.email) {
          // Send email notification using an email service (e.g., Nodemailer)
          this.sendEmailNotification(userId, message);
      }

  }

  private async sendPushNotification(userId: number, message: string): Promise<void> {
    // Implement your push notification logic here
    console.log(`Sending push notification to user ${userId}: ${message}`);
    // Example using a hypothetical push notification service:
    // await pushNotificationService.send(userId, message);
  }


  private async sendEmailNotification(userId: number, message: string): Promise<void> {
      // Implement your email notification logic here
      console.log(`Sending email notification to user ${userId}: ${message}`);
      // Example using a hypothetical email service:
      // await emailService.send(userId, message);

  }

  async getNotifications(userId: number): Promise<any[]> {
      // Implement your database logic to retrieve notifications for the given userId
      console.log(`Fetching notifications for user ${userId}`);
      // Example:
      return [
          { id: 1, message: 'Matching successful!', type: 'push', timestamp: new Date() },
          { id: 2, message: 'New message received', type: 'email', timestamp: new Date() },
      ];
  }
}
```