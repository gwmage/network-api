```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {
  // ... (Existing code remains unchanged)

  async createNotification(userId: number, message: string, type: string, relatedData?: any): Promise<void> {
      // Implement your notification creation logic here (e.g., saving to a database)
      console.log(`Creating notification for user ${userId}: message=${message}, type=${type}`);

      const preferences = await this.getNotificationPreferences(userId);

      if (type === 'comment' && preferences.comment) {
          this.sendCommentNotification(userId, message, relatedData); 
      }

      if (type === 'push' && preferences.push) {
        this.sendPushNotification(userId, message);
      }

      if (type === 'email' && preferences.email) {
          this.sendEmailNotification(userId, message);
      }

  }


  private async sendCommentNotification(userId: number, message: string, relatedData?: any): Promise<void> {
    console.log(`Sending comment notification to user ${userId}: ${message}`, relatedData);
    // Implement your specific notification logic here based on the platform and relatedData,
    // e.g., send email, push notification, or in-app notification.
  }

  // ... (Rest of the existing code remains unchanged)

}
```