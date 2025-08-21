```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../src/auth/auth.controller';
import { AuthService } from '../src/auth/auth.service';
import { UsersService } from '../src/users/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../src/users/dto/create-user.dto';
import { LoginDto } from '../src/auth/dto/login.dto';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  let usersService: UsersService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('adminLogin', () => {
    it('should log in an admin successfully', async () => {
      const loginDto: LoginDto = {
        email: 'admin@example.com',
        password: 'adminPassword',
      };
      const expectedAccessToken = 'mockedAdminAccessToken';
      jest.spyOn(authService, 'adminLogin').mockResolvedValue({ accessToken: expectedAccessToken });

      const result = await controller.adminLogin(loginDto);
      expect(result).toEqual({ accessToken: expectedAccessToken });
    });

    it('should handle invalid admin credentials', async () => {
      const loginDto: LoginDto = {
        email: 'admin@example.com',
        password: 'wrongPassword',
      };
      jest.spyOn(authService, 'adminLogin').mockRejectedValue(new UnauthorizedException('Invalid credentials'));

      try {
        await controller.adminLogin(loginDto);
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
        expect(error.message).toEqual('Invalid credentials');
      }
    });
  });


  // ... other test cases ...
});

```