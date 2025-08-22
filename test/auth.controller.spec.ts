import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../src/modules/auth/auth.controller';
import { AuthService } from '../src/modules/auth/auth.service';
import { UsersService } from '../src/modules/users/users.service'; 
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/modules/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../src/modules/auth/dto/create-user.dto';
import { LoginUserDto } from '../src/modules/auth/dto/login-user.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;
  let usersService: UsersService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        UsersService, // Provide UsersService
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // ... other tests ...
});