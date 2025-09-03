"import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../src/modules/auth/auth.service';
import { UserRepository } from '../src/modules/auth/user.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/modules/auth/entities/user.entity';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: jest.Mocked<UserRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get(getRepositoryToken(User)) as jest.Mocked<UserRepository>;
  });

  it('should register a new user', async () => {
    const registerDto = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
      phoneNumber: '+15551234567',
    };

    const hashedPassword = 'hashedPassword';
    (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
    userRepository.findOne.mockResolvedValue(undefined);
    userRepository.create.mockReturnValue({
      ...registerDto,
      password: hashedPassword,
    });
    userRepository.save.mockResolvedValue(undefined);

    const result = await service.register(registerDto);
    expect(result).toEqual({ success: true });
  });
});"