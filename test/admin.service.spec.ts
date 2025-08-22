```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from '../src/admin/admin.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/users/user.entity';
import { Repository } from 'typeorm';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

describe('AdminService', () => {
  let service: AdminService;
  let userRepository: Repository<User>;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AdminService>(AdminService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('adminLogin', () => {
    it('should login admin successfully', async () => {
      const adminCredentials = {
        username: 'admin',
        password: 'password',
      };
      const expectedAccessToken = 'fake_access_token';

      const mockAdmin = {
        username: 'admin',
        password: 'hashed_password',
        roles: ['admin'],
        id: 1,
      };
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockAdmin as any);
      jest.spyOn(service, 'comparePassword').mockResolvedValue(true)
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue(expectedAccessToken);


      const result = await service.adminLogin(adminCredentials);
      expect(result).toEqual({ accessToken: expectedAccessToken });

      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { username: adminCredentials.username },
      });
      expect(jwtService.signAsync).toHaveBeenCalledWith({
        username: mockAdmin.username,
        sub: mockAdmin.id,
        roles: mockAdmin.roles
      });
    });

    it('should throw UnauthorizedException if admin not found', async () => {
      const adminCredentials = {
        username: 'nonexistent_admin',
        password: 'password',
      };
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      await expect(service.adminLogin(adminCredentials)).rejects.toThrowError(
        new UnauthorizedException('Invalid admin credentials'),
      );
    });

    it('should throw UnauthorizedException for incorrect password', async () => {
      const adminCredentials = {
        username: 'admin',
        password: 'wrong_password',
      };
      const mockAdmin = {
        username: 'admin',
        password: 'hashed_password',
        roles: ['admin'],
        id: 1,
      };
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockAdmin as any);
      jest.spyOn(service, 'comparePassword').mockResolvedValue(false);

      await expect(service.adminLogin(adminCredentials)).rejects.toThrowError(
        new UnauthorizedException('Invalid admin credentials'),
      );
    });

  });
});
```