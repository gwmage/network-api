```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../src/auth/auth.controller';
import { AuthService } from '../src/auth/auth.service';
import { UsersService } from '../src/users/users.service';
import { CreateUserDto } from '../src/users/dto/create-user.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

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
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should register a new user', async () => {
    const createUserDto: CreateUserDto = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
      firstName: 'Test',
      lastName: 'User',
    };
    const createdUser = { ...createUserDto, id: 1 };
    (usersService.create as jest.Mock).mockResolvedValue(createdUser);

    const result = await controller.register(createUserDto);

    expect(usersService.create).toHaveBeenCalledWith(createUserDto);
    expect(result).toEqual({
      status: 'success',
      message: 'User registered successfully',
      userId: 1,
    });
  });

  it('should handle validation errors', async () => {
    const createUserDto: CreateUserDto = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'short', // Short password
      firstName: 'Test',
      lastName: 'User',
    };

    (usersService.create as jest.Mock).mockRejectedValue(new HttpException('Validation error', HttpStatus.BAD_REQUEST));

    try {
      await controller.register(createUserDto);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.getStatus()).toBe(400);
      expect(error.message).toEqual('Validation error');
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

    (usersService.create as jest.Mock).mockRejectedValue({ code: '23505' }); // Duplicate key error code

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

    (usersService.create as jest.Mock).mockRejectedValue(new Error('Something went wrong'));

    try {
      await controller.register(createUserDto);
    } catch (error) {
      expect(error.status).toBe(500);
      expect(error.response).toEqual({
        status: 'error',
        message: 'Something went wrong',
      });
    }
  });
});

```