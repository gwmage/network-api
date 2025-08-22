```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from '../src/admin/admin.controller';
import { AdminService } from '../src/admin/admin.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/users/user.entity';
import { Repository } from 'typeorm';
import { UnauthorizedException } from '@nestjs/common';
import { LoginDto } from '../src/auth/dto/login.dto';


describe('AdminController', () => {
  let controller: AdminController;
  let service: AdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [
        AdminService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<AdminController>(AdminController);
    service = module.get<AdminService>(AdminService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should handle successful admin login', async () => {
    const loginDto: LoginDto = {
      email: 'admin@example.com',
      password: 'adminPassword',
    };
    const expectedAccessToken = 'your_access_token';
    jest.spyOn(service, 'adminLogin').mockResolvedValue({ accessToken: expectedAccessToken });

    const result = await controller.adminLogin(loginDto);
    expect(result).toEqual({ accessToken: expectedAccessToken });
  });

  it('should handle invalid admin credentials', async () => {
    const loginDto: LoginDto = {
      email: 'admin@example.com',
      password: 'wrongPassword',
    };
    jest.spyOn(service, 'adminLogin').mockRejectedValue(new UnauthorizedException('Invalid credentials'));

    try {
      await controller.adminLogin(loginDto);
    } catch (error) {
      expect(error).toBeInstanceOf(UnauthorizedException);
      expect(error.message).toBe('Invalid credentials');
    }
  });
});
```