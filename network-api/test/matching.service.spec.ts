```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { MatchingService } from '../src/modules/matching/matching.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MatchingGroup } from '../src/modules/matching/entities/matching-group.entity';
import { MatchExplanation } from '../src/modules/matching/entities/match-explanation.entity';
import { User } from '../src/modules/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { MatchingResultsDto } from '../src/modules/matching/dto/matching-results.dto';


// Mock user data
const mockUsers: User[] = [
  // ... create an array of mock users with varying regions, preferences, and interests
  { id: 1, region: 'Region A', preferences: ['Preference 1', 'Preference 2'], interests: ['Interest 1', 'Interest 2'], email: 'test1@example.com', name: 'Test User 1', password: 'password', phoneNumber: '1234567890', address: '123 Main St', city: 'Anytown', state: 'CA', zipCode: '12345' },
  { id: 2, region: 'Region B', preferences: ['Preference 2', 'Preference 3'], interests: ['Interest 2', 'Interest 3'], email: 'test2@example.com', name: 'Test User 2', password: 'password', phoneNumber: '1234567890', address: '123 Main St', city: 'Anytown', state: 'CA', zipCode: '12345'  },
  // ... and so on
];

describe('MatchingService', () => {
  let service: MatchingService;
  let matchingGroupRepository: Repository<MatchingGroup>;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MatchingService,
        {
          provide: getRepositoryToken(MatchingGroup),
          useValue: {
            find: jest.fn(),
            clear: jest.fn(),
            save: jest.fn(),
            findByIds: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(MatchExplanation),
          useValue: {}, // You might need to mock this if used
        },
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn().mockResolvedValue(mockUsers),
            findByIds: jest.fn().mockResolvedValue(mockUsers),
          },
        },
      ],
    }).compile();


    service = module.get<MatchingService>(MatchingService);
    matchingGroupRepository = module.get<Repository<MatchingGroup>>(getRepositoryToken(MatchingGroup));

  });


  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should group users', async () => {
    const groups = service.groupUsers(mockUsers);
    expect(groups.length).toBeGreaterThan(0);

  });


  it('should store matching results', async () => {
    const mockResults: MatchingResultsDto = { groups: [], notificationId: '1234' };
    await service.storeMatchingResults(mockResults);

    expect(matchingGroupRepository.save).toHaveBeenCalled();

  });



  it('should retrieve matching results', async () => {

    const mockGroups = [{ groupId: 'group1', users: mockUsers }];
    jest.spyOn(matchingGroupRepository, 'find').mockResolvedValue(mockGroups as any);
    const results = await service.retrieveMatchingResults();

    expect(results.groups).toEqual(mockGroups);

  });

  it('should run weekly matching', async () => {

    await service.runMatching();
    expect(matchingGroupRepository.clear).toHaveBeenCalled();
    expect(matchingGroupRepository.save).toHaveBeenCalled();

  });

});

```