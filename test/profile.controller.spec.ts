import { Test, TestingModule } from '@nestjs/testing';
import { ProfileController } from '../src/modules/profile/profile.controller';
import { ProfileService } from '../src/modules/profile/profile.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/modules/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateProfileDto } from '../src/modules/profile/dto/update-profile.dto';
import { UsersService } from '../src/modules/users/users.service';
import { AuthService } from '../src/modules/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';

describe('ProfileController', () => {
  // ... your test code ...
});