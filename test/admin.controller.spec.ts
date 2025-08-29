import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from '../src/modules/admin/admin.controller'; // Correct import path
import { AdminService } from '../src/modules/admin/admin.service';  // Correct import path
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/modules/users/entities/user.entity'; // Correct import path
import { Repository } from 'typeorm';
import { UnauthorizedException } from '@nestjs/common';
import { LoginDto } from '../src/modules/auth/dto/login.dto'; // Correct import path
import { Match } from '../src/modules/matching/entities/match.entity'; // Correct import path

// ... rest of the test file
