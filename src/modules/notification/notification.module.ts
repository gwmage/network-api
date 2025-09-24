import { Module, forwardRef } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { UsersModule } from '../users/users.module';
import * as admin from 'firebase-admin';
import { MailerModule } from '@nestjs-modules/mailer';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification]), 
    forwardRef(() => UsersModule),
    MailerModule.forRoot({
      transport: {
        // Configure your email transport here (e.g., SMTP, SendGrid)
      },
    }),
    BullModule.registerQueue({
      name: 'notification', // Name of the queue
    }),
  ],
  controllers: [NotificationController],
  providers: [
    NotificationService,
    {
      provide: 'FirebaseAdmin',
      useValue: admin.initializeApp({
        // Configure your Firebase credentials here
      }),
    },
  ],
})
export class NotificationModule {}