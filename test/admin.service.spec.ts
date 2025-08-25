```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from '../src/admin/admin.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/users/user.entity';
import { Repository } from 'typeorm';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

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
    // ... (Existing tests)
  });

  describe('comparePassword', () => {
    it('should return true for matching passwords', async () => {
      const hashedPassword = await bcrypt.hash('password', 10);
      const result = await service.comparePassword('password', hashedPassword);
      expect(result).toBe(true);
    });

    it('should return false for non-matching passwords', async () => {
      const hashedPassword = await bcrypt.hash('password', 10);
      const result = await service.comparePassword('wrong_password', hashedPassword);
      expect(result).toBe(false);
    });
  });
});

```