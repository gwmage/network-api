```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {
  // ... (Existing code remains unchanged)

  async createCommentNotification(userId: number, postId: number, commentContent: string): Promise<void> {
    const message = `New comment on post ${postId}: ${commentContent}`;
    await this.createNotification(userId, message, 'comment');
  }


  async createNotification(userId: number, message: string, type: string, relatedData?: any): Promise<void> {
      // Implement your notification creation logic here (e.g., saving to a database)
      console.log(`Creating notification for user ${userId}: message=${message}, type=${type}`);

      // Store notification in database including relatedData if provided.
      // Example:
      // await this.notificationRepository.save({ userId, message, type, relatedData, read: false });


      const preferences = await this.getNotificationPreferences(userId);

      if (type === 'comment' && preferences.comment) { // Check comment preference
          this.sendCommentNotification(userId, message, relatedData); // Pass relatedData if needed.
      }


      if (type === 'push' && preferences.push) {
        // Send push notification using a push notification service (e.g., Firebase Cloud Messaging)
        this.sendPushNotification(userId, message);
      }

      if (type === 'email' && preferences.email) {
          // Send email notification using an email service (e.g., Nodemailer)
          this.sendEmailNotification(userId, message);
      }

  }

  // Example of a dedicated comment notification sender (adapt as needed)
  private async sendCommentNotification(userId: number, message: string, relatedData?: any): Promise<void> {
    // Here you might use different notification methods based on preferences or relatedData
    // For instance, you could send an email, a push notification, or an in-app notification.

    console.log(`Sending comment notification to user ${userId}: ${message}`, relatedData);
    // Implement your specific notification logic here based on the platform and relatedData
  }

  // ... (Rest of the existing code remains unchanged)


}

```