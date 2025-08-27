```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../src/users/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../src/users/dto/create-user.dto';
import { UpdateUserDto } from '../src/users/dto/update-user.dto';
import { FindUsersDto } from '../src/users/dto/find-users.dto';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // ... other test suites

  describe('findUsers', () => {
    it('should return users based on provided filters', async () => {
      const findUsersDto: FindUsersDto = {
        username: 'testuser',
        email: 'test@example.com',
      };
      const mockUsers: User[] = [{ id: 1, ...findUsersDto } as User];
      const findOptions = { where: findUsersDto };
      jest.spyOn(userRepository, 'find').mockResolvedValue(mockUsers);
      const result = await service.findUsers(findUsersDto);
      expect(userRepository.find).toHaveBeenCalledWith(findOptions);
      expect(result).toEqual(mockUsers);
    });

    it('should return all users if no filters are provided', async () => {
      const findUsersDto: FindUsersDto = {};
      const mockUsers: User[] = [{ id: 1, username: 'user1' } as User];
      jest.spyOn(userRepository, 'find').mockResolvedValue(mockUsers);
      const result = await service.findUsers(findUsersDto);
      expect(userRepository.find).toHaveBeenCalledWith({}); // Empty filter
      expect(result).toEqual(mockUsers);
    });

    it('should handle partial filters correctly', async () => {
      const findUsersDto: FindUsersDto = { username: 'testuser' };
      const mockUsers: User[] = [{ id: 1, username: 'testuser' } as User];
      const findOptions = { where: findUsersDto };
      jest.spyOn(userRepository, 'find').mockResolvedValue(mockUsers);
      const result = await service.findUsers(findUsersDto);
      expect(userRepository.find).toHaveBeenCalledWith(findOptions);
      expect(result).toEqual(mockUsers);
    });
  });
});

```