import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserNotificationPreferences } from './entities/user-notification-preferences.entity';
import { NotificationDeliveryStatus } from './entities/notification-delivery-status.entity';
import { User } from '../auth/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserNotificationPreferences, NotificationDeliveryStatus, User])],
  providers: [NotificationService],
  controllers: [NotificationController],
  exports: [NotificationService], // Export the service if needed by other modules
})
export class NotificationModule {}
