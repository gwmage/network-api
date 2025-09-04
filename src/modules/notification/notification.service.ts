```typescript
import { Injectable } from '@nestjs/common';
import { NotificationPreferences, Notification, NotificationStatus, NotificationDeliveryStatus, NotificationType } from './entities/notification.entity';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';


// ... (Existing code)

@Injectable()
export class NotificationService {

    constructor(
        @InjectRepository(Notification)
        private notificationRepository: Repository<Notification>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
      ) {}

    async createNotification(createNotificationDto: CreateNotificationDto): Promise<Notification> {

        const { userId, commentId, postId } = createNotificationDto;
    
        const user = await this.userRepository.findOneBy({ id: parseInt(userId) });
        if (!user) {
            throw new Error("user not found"); // Handle user not found
        }

        const newNotification = this.notificationRepository.create({
            recipient: user,
            commentId: parseInt(commentId), // Assuming commentId is a number in your entity
            postId,
            type: NotificationType.COMMENT, // set the type of notification
            timestamp: new Date(),
            status: NotificationStatus.SENT,
            deliveryStatus: NotificationDeliveryStatus.PENDING,
        });
    
        return await this.notificationRepository.save(newNotification);
    }

    // ... (Existing code)
}

```