```typescript
import { Injectable } from '@nestjs/common';
import { NotificationPreferences } from './entities/notification.entity';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';

// ... (Existing code)

@Injectable()
export class NotificationService {
    // ... (Existing code)

    async sendCancellationConfirmation(userId: number, reservationId: string): Promise<void> {
        const message = `Your reservation (ID: ${reservationId}) has been cancelled.`;
        await this.sendNotification(userId, message);
    }

    // ... (Existing code)
}

```