```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../src/auth/auth.controller';
import { AuthService } from '../src/auth/auth.service';
import { UsersService } from '../src/users/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../src/users/dto/create-user.dto';

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

  describe('register', () => {
    it('should register a new user', async () => {
      const createUserDto: CreateUserDto = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User',
      };

      const createdUser = { ...createUserDto, id: 1 };
      jest.spyOn(usersService, 'create').mockResolvedValue(createdUser);

      const result = await controller.register(createUserDto);
      expect(result).toEqual({
        status: 'success',
        message: 'User registered successfully',
        userId: 1,
      });
    });

    it('should handle validation errors', async () => {
      const createUserDto: CreateUserDto = {
        username: '', // Invalid username
        email: 'invalid_email', // Invalid email
        password: 'short', // Short password
        firstName: 'Test',
        lastName: 'User',
      };

      jest.spyOn(usersService, 'create').mockRejectedValue({ message: 'Validation error' });


      try {
        await controller.register(createUserDto);
      } catch (error) {
        expect(error.status).toBe(400);
        expect(error.response).toEqual({
           status: 'error',
           message: 'Validation error',
        });
      }
    });


    it('should handle duplicate email', async () => {
      const createUserDto: CreateUserDto = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User',
      };

      jest.spyOn(usersService, 'create').mockRejectedValue({ code: '23505' }); // Duplicate key error code

      try {
        await controller.register(createUserDto);
      } catch (error) {
        expect(error.status).toBe(409);
        expect(error.response).toEqual({
          status: 'error',
          message: 'Email already exists',
          errors: { email: 'This email is already registered.' },
        });
      }
    });


    it('should handle other errors', async () => {
      const createUserDto: CreateUserDto = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User',
      };

      jest.spyOn(usersService, 'create').mockRejectedValue(new Error('Database error'));


      try {
        await controller.register(createUserDto);
      } catch (error) {
        expect(error.status).toBe(500);
        expect(error.response).toEqual({
          status: 'error',
          message: 'An error occurred during registration',

        });
      }
    });

  });
});

```