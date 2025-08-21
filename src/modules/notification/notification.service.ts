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

      // Implement sending the notification based on user preferences and notification type
      const preferences = await this.getNotificationPreferences(userId);

      if (type === 'push' && preferences.push) {
        // Send push notification
        console.log('Sending push notification:', message);
      }

      if (type === 'email' && preferences.email) {
          // Send email notification
          console.log('Sending email notification:', message);
      }

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