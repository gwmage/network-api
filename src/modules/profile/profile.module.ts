import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { AuthModule } from '../auth/auth.module';  // Import AuthModule

@Module({
  imports: [TypeOrmModule.forFeature([Profile]), AuthModule], // Import AuthModule here
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
