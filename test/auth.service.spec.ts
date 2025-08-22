import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../src/modules/auth/auth.service'; // Import AuthService not UsersService
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/modules/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from '../src/modules/users/users.service';

describe('AuthService', () => {  // Change to AuthService
  let service: AuthService;  // Change type to AuthService
  let userRepository: Repository<User>;
  let usersService: UsersService;      // Add this

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule.register({})],
      providers: [
        AuthService, 
        UsersService,  // Provide UsersService here
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    usersService = module.get<UsersService>(UsersService);  // Add this
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // ... your test code ...
});
