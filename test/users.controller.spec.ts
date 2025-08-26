```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../src/users/users.controller';
import { UsersService } from '../src/users/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/users/entities/user.entity';
import { MatchingRequestDto } from '../src/modules/matching/dto/matching-request.dto';
import { CreateUserDto } from '../src/users/dto/create-user.dto';
import { UpdateUserDto } from '../src/users/dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

// Mock user data
const mockUsers = [
  { id: 1, name: 'John Doe', region: '서울', interests: ['sports', 'reading'] },
  { id: 2, name: 'Jane Doe', region: '경기', interests: ['movies', 'cooking'] },
  { id: 3, name: 'Peter Pan', region: '서울', interests: ['coding', 'gaming'] },
  { id: 4, name: 'Alice Wonderland', region: '부산', interests: ['reading', 'writing'] },
];

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn().mockResolvedValue(mockUsers),
            findOne: jest.fn().mockImplementation((id: number) =>
              Promise.resolve(mockUsers.find((user) => user.id === id)),
            ),
            create: jest.fn().mockImplementation((user: CreateUserDto) =>
              Promise.resolve({ id: mockUsers.length + 1, ...user }),
            ),
            update: jest.fn().mockResolvedValue(true),
            remove: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  // ... existing tests ...

  describe('createUser', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = { name: 'New User', region: '서울', interests: ['reading'] };
      expect(await controller.create(createUserDto)).toHaveProperty('id');
    });
  });

  describe('updateUser', () => {
    it('should update an existing user', async () => {
      const updateUserDto: UpdateUserDto = { name: 'Updated User' };
      expect(await controller.update(1, updateUserDto)).toEqual({ message: 'User updated successfully' });
    });

    it('should throw NotFoundException if user not found', async () => {
      const updateUserDto: UpdateUserDto = { name: 'Updated User' };
      await expect(controller.update(999, updateUserDto)).rejects.toThrow(NotFoundException);
    });
  });


  describe('removeUser', () => {
    it('should remove an existing user', async () => {
      expect(await controller.remove(1)).toEqual({ message: 'User removed successfully' });
    });

    it('should throw NotFoundException if user not found', async () => {
      await expect(controller.remove(999)).rejects.toThrow(NotFoundException);
    });

  });


});

```