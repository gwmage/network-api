import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../auth/entities/user.entity';
import { UsersModule } from '../users/users.module'; // Import UsersModule

@Module({
  imports: [TypeOrmModule.forFeature([User]), UsersModule], // Include UsersModule in imports
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}