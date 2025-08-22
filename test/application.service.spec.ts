import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationService } from '../src/application/application.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Application } from '../src/application/application.entity';
import { Repository } from 'typeorm';
import { User } from '../src/users/user.entity';
import { PaginatedApplicationsDto } from '../src/application/dto/paginated-applications.dto';

describe('ApplicationService', () => {
  let service: ApplicationService;
  let repository: Repository<Application>;

  // ... rest of the test code
});
