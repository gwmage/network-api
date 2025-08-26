```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../src/auth/auth.service';
import { UsersService } from '../src/users/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../src/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

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

  describe('register', () => {
    it('should register a new user', async () => {
      const createUserDto: CreateUserDto = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User',
      };

      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const createdUser = { ...createUserDto, password: hashedPassword, id: 1 };

      jest.spyOn(usersService, 'create').mockResolvedValue(createdUser as User);

      const result = await service.register(createUserDto);

      expect(usersService.create).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual({
        status: 'success',
        message: 'User registered successfully',
        userId: 1,
      });
    });

    it('should handle email uniqueness error', async () => {
      const createUserDto: CreateUserDto = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User',
      };

      jest.spyOn(usersService, 'create').mockRejectedValue({ code: '23505' });

      try {
        await service.register(createUserDto);
      } catch (error) {
        expect(error.status).toBe(409);
        expect(error.message).toEqual('Email already exists');
      }
    });


    it('should handle other errors during registration', async () => {
      const createUserDto: CreateUserDto = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User',
      };

      jest.spyOn(usersService, 'create').mockRejectedValue(new Error('Database error'));

      try {
        await service.register(createUserDto);
      } catch (error) {
        expect(error.status).toBe(500);
        expect(error.message).toEqual('Something went wrong during registration');
      }
    });
  });
});
```