import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ReservationModule } from './modules/reservation/reservation.module';
import { AuthModule } from './modules/auth/auth.module';
import { AdminModule } from './modules/admin/admin.module';
import { ApplicationModule } from './modules/application/application.module';
import { CommunityModule } from './modules/community/community.module';
import { NotificationModule } from './modules/notification/notification.module';
import { ProfileModule } from './modules/profile/profile.module';
import { MatchingModule } from './modules/matching/matching.module';

console.log("Value of UsersModule import:", UsersModule);
console.log("Value of ReservationModule import:", ReservationModule);

@Module({
  imports: [UsersModule, ReservationModule, AuthModule, AdminModule, ApplicationModule, CommunityModule, NotificationModule, ProfileModule, MatchingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
