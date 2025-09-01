```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../src/users/users.controller';
import { UsersService } from '../src/users/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/users/entities/user.entity';
import { CreateUserDto } from '../src/users/dto/create-user.dto';
import { UpdateUserDto } from '../src/users/dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';
import { PageOptionsDto } from '../src/common/dtos/page-options.dto';
import { PageDto } from '../src/common/dtos/page.dto';
import { PageMetaDto } from '../src/common/dtos/page-meta.dto';
import { FindUsersQueryDto } from '../src/users/dto/find-users-query.dto';

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
            update: jest.fn().mockImplementation((id: number, user: UpdateUserDto) => {
              const index = mockUsers.findIndex((u) => u.id === id);
              if (index !== -1) {
                mockUsers[index] = { ...mockUsers[index], ...user };
                return Promise.resolve(mockUsers[index]);
              }
              return Promise.resolve(null);
            }),
            remove: jest.fn().mockResolvedValue(true),
            findAndCount: jest.fn().mockResolvedValue([mockUsers, mockUsers.length]),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should create a user', async () => {
    const createUserDto: CreateUserDto = { name: 'Test User', region: 'Test Region', interests: ['test'] };
    expect(await controller.create(createUserDto)).toEqual({ id: 5, ...createUserDto });
  });

  it('should update a user', async () => {
    const updateUserDto: UpdateUserDto = { name: 'Updated User' , region: 'Updated Region', interests: ['updated']};
    expect(await controller.update(1, updateUserDto)).toEqual({ ...mockUsers[0], ...updateUserDto });
  });


  it('should return 404 when updating a non-existing user', async () => {
      const updateUserDto: UpdateUserDto = { name: 'Updated User', region: 'Updated Region', interests: ['updated'] };
      await expect(controller.update(999, updateUserDto)).rejects.toThrow(NotFoundException);
  });
  it('should delete a user', async () => {
    expect(await controller.remove(1)).toEqual({deleted: true});
  });

  it('should get a user by id', async () => {
    expect(await controller.findOne(1)).toEqual(mockUsers[0]);
  });

  it('should throw NotFoundException if user not found', async () => {
    (service as any).findOne = jest.fn().mockResolvedValue(undefined); // Simulate user not found
    await expect(controller.findOne(999)).rejects.toThrow(NotFoundException);
  });
  // ... other tests
});
```