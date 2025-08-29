import { Test, TestingModule } from '@nestjs/testing';
import { ProfileController } from '../src/modules/profile/profile.controller';
import { ProfileService } from '../src/modules/profile/profile.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Profile } from '../src/modules/profile/entities/profile.entity';
import { Repository } from 'typeorm';
import { UpdateProfileDto } from '../src/modules/profile/dto/update-profile.dto';
import { UsersService } from '../src/modules/users/users.service'; // Correct import path

// ... rest of the test file
