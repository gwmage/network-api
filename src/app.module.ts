import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AdminModule } from './modules/admin/admin.module';
import { ApplicationModule } from './modules/application/application.module';
import { CommunityModule } from './modules/community/community.module';
import { MatchingModule } from './modules/matching/matching.module';
import { NotificationModule } from './modules/notification/notification.module';
import { ProfileModule } from './modules/profile/profile.module';
import { ReservationModule } from './modules/reservation/reservation.module';


@Module({
  imports: [
    AuthModule, UsersModule, AdminModule, ApplicationModule, 
    CommunityModule, MatchingModule, NotificationModule, ProfileModule, ReservationModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
