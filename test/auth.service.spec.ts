```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../src/modules/auth/auth.service';
import { UsersService } from '../src/modules/users/users.service';
import { RegisterDto } from '../src/modules/auth/dto/register.dto';
import * as bcrypt from 'bcrypt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/modules/users/entities/user.entity';
import { Repository } from 'typeorm';

describe('AuthService', () => {
  let authService: AuthService;
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

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should register a new user', async () => {
    const registerDto: RegisterDto = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'securePassword123',
      firstName: 'Test',
      lastName: 'User',
    };

    jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(null);
    jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword');
    jest.spyOn(userRepository, 'create').mockReturnValue({ ...registerDto, id: 1, password: 'hashedPassword' } as User);
    jest.spyOn(userRepository, 'save').mockResolvedValue({ ...registerDto, id: 1, password: 'hashedPassword' } as User);

    const result = await authService.register(registerDto);

    expect(result.status).toBe('success');
    expect(result.message).toBe('User registered successfully');
    expect(result.userId).toBe(1);
    expect(bcrypt.hash).toHaveBeenCalledWith(registerDto.password, 10);
  });

  it('should handle email uniqueness', async () => {
    const registerDto: RegisterDto = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'securePassword123',
      firstName: 'Test',
      lastName: 'User',
    };

    jest.spyOn(userRepository, 'findOneBy').mockResolvedValue({} as User);

    const result = await authService.register(registerDto);

    expect(result.status).toBe('error');
    expect(result.message).toBe('Email already exists');
  });

  it('should handle validation errors', async () => {
    const registerDto: RegisterDto = {
      username: '', // Invalid username
      email: 'invalid_email', // Invalid email
      password: 'short', // Short password
      firstName: 'Test',
      lastName: 'User',
    };

    const result = await authService.register(registerDto);

    expect(result.status).toBe('error');
    expect(result.message).toBe('Validation failed');
    expect(result.errors).toBeDefined();
  });
});
```