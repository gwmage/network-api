```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../src/auth/auth.controller';
import { AuthService } from '../src/auth/auth.service';
import { UsersService } from '../src/users/users.service';
import { CreateUserDto } from '../src/users/dto/create-user.dto';
import { User } from '../src/users/entities/user.entity';

describe('AuthController', () => {
  let controller: AuthController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {}, // We're not testing the service here, so an empty object is sufficient
        },
        {
          provide: UsersService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should register a new user', async () => {
    const createUserDto: CreateUserDto = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
      firstName: 'Test',
      lastName: 'User',
    };
    const createdUser: User = { id: 1, ...createUserDto } as User;

    jest.spyOn(usersService, 'create').mockResolvedValue(createdUser);

    expect(await controller.register(createUserDto)).toEqual({
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
});

```