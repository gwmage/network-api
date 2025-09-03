// test/auth.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../src/modules/auth/auth.controller';
import { AuthService } from '../src/modules/auth/auth.service';
import { RegisterDto } from '../src/modules/auth/dto/register.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/modules/auth/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ConflictException } from '@nestjs/common';
import { UserRepository } from '../src/modules/auth/user.repository';


// Mock UserRepository
const mockUserRepository = {
  createUser: jest.fn(),
  checkEmailUniqueness: jest.fn(),
};

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(UserRepository), // Use UserRepository here
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });


  it('should register a new user', async () => {
    const registerDto: RegisterDto = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
      phoneNumber: '010-1234-5678',
      location: 'Test Location',
      preferences: 'Test Preferences',
      interests: ['Test Interest 1', 'Test Interest 2']
    };

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const createdUser = { ...registerDto, password: hashedPassword, id: 1 };

    mockUserRepository.createUser.mockResolvedValue(createdUser);
    mockUserRepository.checkEmailUniqueness.mockResolvedValue(undefined);


    const result = await controller.register(registerDto);

    expect(result).toEqual({
      status: 'success',
      message: 'User registered successfully',
    });
    expect(mockUserRepository.createUser).toHaveBeenCalledWith({
      ...registerDto,
      password: expect.any(String), // Expect password to be hashed
    });
  });



  it('should throw ConflictException if email already exists', async () => {
    const registerDto: RegisterDto = {
      email: 'existing@example.com',
      password: 'password123',
      name: 'Existing User',
    };

    mockUserRepository.checkEmailUniqueness.mockRejectedValue(new ConflictException('Email already exists'));
    
    await expect(controller.register(registerDto)).rejects.toThrow(ConflictException);
  });


});
