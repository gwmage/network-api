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


  it('should group users correctly', async () => {
    // Create mock users with varying attributes
    const users: User[] = [];
    for (let i = 0; i < 12; i++) {
      const user = new User();
      user.region = i % 2 === 0 ? 'A' : 'B';
      user.preferences = i % 3 === 0 ? ['preference1'] : ['preference2'];
      user.interests = i % 4 === 0 ? ['interest1'] : ['interest2'];
      users.push(user);
      await userRepository.save(user); // save to mock repository
    }


    const groups = service.groupUsers(users);

    expect(groups.length).toBe(3); // Expect 3 groups of ~5 users

    // Check group sizes
    expect(groups[0].users.length).toBe(5);
    expect(groups[1].users.length).toBe(5);
    expect(groups[2].users.length).toBe(2); // Last group may have fewer users

  });

  // ...add more tests for edge cases and large datasets


  it('should handle empty user list', async () => {
    const groups = service.groupUsers([]);
    expect(groups.length).toBe(0);
  });



});