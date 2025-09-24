```typescript
import { Injectable } from '@nestjs/common';
import { Notification, NotificationStatus, NotificationDeliveryStatus, NotificationType } from './entities/notification.entity';
//import { initializeApp } from "firebase/app";
//import { getApps } from "firebase/app";
import { FirebaseApp } from 'firebase/app';
import { Messaging } from 'firebase-admin/messaging';

//if (getApps().length === 0) {
//  initializeApp();
//}

import * as nodemailer from 'nodemailer';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationEvent } from './dto/notification-event.enum';
import { Application } from '../application/entities/application.entity';

@Injectable()
export class NotificationService {

    private firebaseApp: FirebaseApp;
    private messaging: Messaging;

    constructor(
        @InjectRepository(Notification)
        private notificationRepository: Repository<Notification>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Application)
        private applicationRepository: Repository<Application>
      ) {}

    async createNotification(createNotificationDto: CreateNotificationDto): Promise<Notification> {
      // ... existing code
    }

    async sendCancellationConfirmation(userId: number, reservationId: number): Promise<void> {
        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user) {
            throw new Error("User not found");
        }

        const newNotification = this.notificationRepository.create({
            recipient: user,
            reservationId: reservationId,
            type: NotificationType.RESERVATION_CANCELLATION,
            timestamp: new Date(),
            status: NotificationStatus.SENT,
            deliveryStatus: NotificationDeliveryStatus.PENDING
          });

        await this.notificationRepository.save(newNotification);

        // TODO: Replace with actual email/notification sending logic using nodemailer, firebase admin sdk, etc.
        console.log(`Sending cancellation confirmation to user ${userId} for reservation ${reservationId}`);
        // Example using nodemailer:
        // const transporter = nodemailer.createTransport({ ... your nodemailer config ... });
        // await transporter.sendMail({
        //   from: '"Your App" <your@email.com>',
        //   to: user.email,
        //   subject: 'Reservation Cancellation Confirmation',
        //   text: `Your reservation ${reservationId} has been cancelled.`,
        //   html: `Your reservation ${reservationId} has been cancelled.`,
        // });
    }

    // ... (Existing code)
}

```