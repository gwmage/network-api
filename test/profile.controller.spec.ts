import { Test, TestingModule } from '@nestjs/testing';
import { ProfileController } from '../src/profile/profile.controller';
import { ProfileService } from '../src/profile/profile.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Profile } from '../src/profile/profile.entity';
import { Repository } from 'typeorm';
import { UpdateProfileDto } from '../src/profile/dto/update-profile.dto';
import { UsersService } from '../src/users/users.service';
import { User } from '../src/users/user.entity';

// ... test code
