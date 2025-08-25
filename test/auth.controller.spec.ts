```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../src/modules/auth/auth.controller';
import { AuthService } from '../src/modules/auth/auth.service';
import { UsersService } from '../src/modules/users/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/modules/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { UnauthorizedException } from '@nestjs/common';
import { LoginDto } from '../src/modules/auth/dto/login.dto';


describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            adminLogin: jest.fn(),
          },
        },
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
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
        expect(error.message).toBe('Invalid credentials');
      }
    });
  });
});

```