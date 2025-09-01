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

    // Placeholder functions for comment-related notifications
    async sendCommentNotification(userId: number, commentData: any): Promise<void> {
        // Implement logic to send notification when a new comment is created
        const message = `New comment on your post: ${commentData.content}`;
        await this.sendNotification(userId, message);


    }

    async sendReplyNotification(userId: number, replyData: any): Promise<void> {
        // Implement logic to send notification when a new reply is added to a comment
        const message = `New reply to your comment: ${replyData.content}`;
        await this.sendNotification(userId, message);
    }


    private async sendNotification(userId: number, message: string): Promise<void> {

        const notificationPreferences = await this.getNotificationPreferences(userId);


        if (notificationPreferences.pushNotifications) {
            this.sendPushNotification(userId, message);
        }
        if (notificationPreferences.emailNotifications) {
            this.sendEmailNotification(userId, message);
        }

    }

    private async sendPushNotification(userId: number, message: string): Promise<void> {
        // ... existing implementation
    }


    private async sendEmailNotification(userId: number, message: string): Promise<void> {
        // ... existing implementation
    }



    // Dummy implementations for retrieving user's FCM token and email. Replace these with your actual database queries.
    private async getUserFCMToken(userId: number): Promise<string | undefined> {
        // ... existing implementation
    }

    private async getUserEmail(userId: number): Promise<string | undefined> {
        // ... existing implementation
    }

    private async getNotificationPreferences(userId: number): Promise<NotificationPreferences> {

        // Replace this with your actual database query.
        return {
            pushNotifications: true,
            emailNotifications: true
        }
    }


    // ... (Rest of the existing code)


}

```