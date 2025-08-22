import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationController } from '../src/modules/application/application.controller';
import { ApplicationService } from '../src/modules/application/application.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Application } from '../src/modules/application/entities/application.entity';
import { Repository } from 'typeorm';
import { User } from '../src/modules/auth/entities/user.entity';  // Correct import path
import { UsersService } from '../src/modules/users/users.service';

describe('ApplicationController', () => {
  // ... your test code ...
});