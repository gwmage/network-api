```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../src/users/users.controller';
import { UsersService } from '../src/users/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/users/entities/user.entity';
import { MatchingRequestDto } from '../src/modules/matching/dto/matching-request.dto';


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
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should filter users by single region', async () => {
    const filter: MatchingRequestDto = { regions: ['서울'] };
    const result = await controller.findAll(filter);
    expect(result).toEqual([mockUsers[0], mockUsers[2]]);
  });

  it('should filter users by multiple regions', async () => {
    const filter: MatchingRequestDto = { regions: ['서울', '경기'] };
    const result = await controller.findAll(filter);
    expect(result).toEqual([mockUsers[0], mockUsers[1], mockUsers[2]]);
  });

  it('should filter users by single interest', async () => {
    const filter: MatchingRequestDto = { interests: ['reading'] };
    const result = await controller.findAll(filter);
    expect(result).toEqual([mockUsers[0], mockUsers[3]]);
  });

  it('should filter users by multiple interests', async () => {
    const filter: MatchingRequestDto = { interests: ['reading', 'sports'] };
    const result = await controller.findAll(filter);
    expect(result).toEqual([mockUsers[0]]);
  });


  it('should filter users by both region and interests', async () => {
    const filter: MatchingRequestDto = { regions: ['서울'], interests: ['reading'] };
    const result = await controller.findAll(filter);
    expect(result).toEqual([mockUsers[0]]);
  });

  it('should return all users with empty filter', async () => {
    const filter: MatchingRequestDto = {};
    const result = await controller.findAll(filter);
    expect(result).toEqual(mockUsers);
  });

  it('should handle invalid input', async () => {
    const filter: MatchingRequestDto = { regions: null, interests: undefined }; // Example invalid input
    const result = await controller.findAll(filter);
    expect(result).toEqual(mockUsers); // Should return all users or handle the error appropriately
  });

});

```