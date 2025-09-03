"import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../src/modules/auth/auth.controller';
import { AuthService } from '../src/modules/auth/auth.service';
import { RegisterDto } from '../src/modules/auth/dto/register.dto';
import { HttpStatus } from '@nestjs/common';

jest.mock('../src/modules/auth/auth.service'); // Mock the AuthService

describe('AuthController', () => {
  let controller: AuthController;
  let authService: jest.Mocked<AuthService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get(AuthService) as jest.Mocked<AuthService>;
  });

  it('should register a new user', async () => {
    const registerDto: RegisterDto = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
      phoneNumber: '+15551234567',
    };
    authService.register.mockResolvedValue({ success: true });
    expect(await controller.register(registerDto)).toEqual({ success: true });
  });

  it('should handle email duplication error', async () => {
    const registerDto: RegisterDto = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
      phoneNumber: '+15551234567',
    };

    authService.register.mockRejectedValue({
      response: { message: 'Email already exists', statusCode: HttpStatus.BAD_REQUEST },
      status: HttpStatus.BAD_REQUEST,
    });
    const result = await controller.register(registerDto).catch((e) => e.response);
    expect(result).toEqual({
      message: 'Email already exists',
      statusCode: HttpStatus.BAD_REQUEST,
    });

  });
});"