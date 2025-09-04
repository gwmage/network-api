import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserNotificationPreferences } from './entities/user-notification-preferences.entity';
import { NotificationDeliveryStatus } from './entities/notification-delivery-status.entity';
import { User } from '../auth/entities/user.entity';
// import * as firebaseAdmin from 'firebase-admin'; // Import firebase-admin

@Module({
  imports: [
    TypeOrmModule.forFeature([UserNotificationPreferences, NotificationDeliveryStatus, User]),
    //  FirebaseAdminModule.forRootAsync({
    //   useFactory: () => {
    //       const serviceAccount = require('../../path/to/your/serviceAccountKey.json'); // Replace with your service account path
    //       return {
    //           credential: firebaseAdmin.credential.cert(serviceAccount),
    //       };
    //   },
    // }),
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}