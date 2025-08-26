```typescript
import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { UsersModule } from '../users/users.module';
import * as admin from 'firebase-admin';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification]), 
    UsersModule,
    MailerModule.forRoot({
      transport: {
        // Configure your email transport here (e.g., SMTP, SendGrid)
      },
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
```