```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../src/auth/auth.service';
import { UsersService } from '../src/users/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/users/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { AdminLoginDto } from '../src/auth/dto/admin-login.dto';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('adminLogin', () => {
    it('should return a token upon successful admin login', async () => {
      const email = 'admin@example.com';
      const password = 'adminPassword';
      const hashedPassword = await bcrypt.hash(password, 10);
      const adminUser = new User();
      adminUser.email = email;
      adminUser.password = hashedPassword;
      adminUser.isAdmin = true;

      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(adminUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

      const result = await service.adminLogin({ email, password } as AdminLoginDto);
      expect(result.access_token).toBeDefined();
    });

    it('should throw UnauthorizedException if admin credentials are incorrect', async () => {
      const email = 'admin@example.com';
      const password = 'wrongPassword';

      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(null);

      await expect(
        service.adminLogin({ email, password } as AdminLoginDto),
      ).rejects.toThrowError(UnauthorizedException);
    });

    it('should throw UnauthorizedException if user is not admin', async () => {
      const email = 'user@example.com';
      const password = 'userPassword';
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User();
      user.email = email;
      user.password = hashedPassword;
      user.isAdmin = false;

      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);


      await expect(service.adminLogin({ email, password } as AdminLoginDto)).rejects.toThrowError(UnauthorizedException);
    })
  });


  // Existing login tests
  // ...
});

```