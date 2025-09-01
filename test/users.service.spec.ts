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

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = { username: 'testuser', email: 'test@example.com', password: 'password', firstName: 'Test', lastName: 'User' };
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
      const mockUsers: User[] = [{ id: 1, username: 'user1' } as User];
      jest.spyOn(userRepository, 'find').mockResolvedValue(mockUsers);
      const users = await service.findAll();
      expect(users).toEqual(mockUsers);
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const mockUser: User = { id: 1, username: 'user1' } as User;
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(mockUser);
      const user = await service.findOne(1);
      expect(user).toEqual(mockUser);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto: UpdateUserDto = { username: 'updateduser' };
      const mockUser: User = { id: 1, username: 'user1' } as User;
      jest.spyOn(userRepository, 'preload').mockResolvedValue({ ...mockUser, ...updateUserDto } as User);
      jest.spyOn(userRepository, 'save').mockResolvedValue({ id: 1, username: 'updateduser' } as User);
      const result = await service.update(1, updateUserDto);
      expect(userRepository.preload).toHaveBeenCalledWith({ id:1, ...updateUserDto });
      expect(userRepository.save).toHaveBeenCalled();
      expect(result.username).toEqual('updateduser');

    });
  });


  describe('remove', () => {
    it('should remove a user', async () => {
      jest.spyOn(userRepository, 'delete').mockResolvedValue({ affected: 1 });
      await service.remove(1);
      expect(userRepository.delete).toHaveBeenCalledWith(1);
    });
  });

  describe('findUsers', () => {
    // ... existing tests
  });
});

```