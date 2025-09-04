import { Test, TestingModule } from '@nestjs/testing';
import { MatchingService } from '../src/modules/matching/matching.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MatchingGroup } from '../src/modules/matching/entities/matching-group.entity';
import { MatchExplanation } from '../src/modules/matching/entities/match-explanation.entity';
import { User } from '../src/modules/auth/entities/user.entity';
import { Repository } from 'typeorm';

describe('MatchingService', () => {
  let service: MatchingService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MatchingService,
        {
          provide: getRepositoryToken(MatchingGroup),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(MatchExplanation),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<MatchingService>(MatchingService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate matching results', async () => {
    const users: User[] = [];
    for (let i = 0; i < 10; i++) {
      const user = new User();
      user.id = i + 1;
      users.push(user);
    }

    jest.spyOn(userRepository, 'find').mockResolvedValue(users);
    const result = await service.generateMatchingResults({});
    expect(result.groups.length).toBeGreaterThan(0);
  });


  it('should measure performance', async () => {
    const users: User[] = [];
    for (let i = 0; i < 1000; i++) {
      const user = new User();
      user.id = i + 1;
      users.push(user);
    }
    jest.spyOn(userRepository, 'find').mockResolvedValue(users);

    const start = Date.now();
    await service.generateMatchingResults({});
    const end = Date.now();
    const duration = end - start;
    console.log(`Matching 1000 users took ${duration}ms`);
    expect(duration).toBeLessThan(5000); // Example: expect matching to be under 5 seconds
  });
});