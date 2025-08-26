```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../src/users/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../src/users/dto/create-user.dto';
import { UpdateUserDto } from '../src/users/dto/update-user.dto';

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

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User',
      };
      const createdUser: User = { id: 1, ...createUserDto } as User;
      jest.spyOn(userRepository, 'create').mockReturnValue(createdUser);
      jest.spyOn(userRepository, 'save').mockResolvedValue(createdUser);
      const result = await service.create(createUserDto);
      expect(userRepository.create).toHaveBeenCalledWith(createUserDto);
      expect(userRepository.save).toHaveBeenCalledWith(createdUser);
      expect(result).toEqual(createdUser);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const mockUsers: User[] = [{ id: 1, username: 'user1' } as User, { id: 2, username: 'user2' } as User];
      jest.spyOn(userRepository, 'find').mockResolvedValue(mockUsers);
      const users = await service.findAll();
      expect(users).toEqual(mockUsers);
    });
  });

  describe('findOne', () => {
    it('should find a user by id', async () => {
      const mockUser = { id: 1, username: 'John Doe' } as User;
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser);
      const result = await service.findOne(1);
      expect(userRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(mockUser);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto: UpdateUserDto = { username: 'Updated Name' };
      const mockUser = { id: 1, username: 'John Doe' } as User;
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser);
      jest.spyOn(userRepository, 'save').mockResolvedValue({ ...mockUser, ...updateUserDto });
      const result = await service.update(1, updateUserDto);
      expect(userRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(userRepository.save).toHaveBeenCalledWith({ ...mockUser, ...updateUserDto });
      expect(result).toEqual({ ...mockUser, ...updateUserDto });
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const mockUser = { id: 1, username: 'John Doe' } as User;
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser);
      jest.spyOn(userRepository, 'remove').mockResolvedValue(mockUser);
      const result = await service.remove(1);
      expect(userRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(userRepository.remove).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual(mockUser);
    });
  });
});

```