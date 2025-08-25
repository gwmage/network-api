```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { MatchingService } from '../src/modules/matching/matching.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Profile } from '../src/entities/profile.entity';
import { Repository } from 'typeorm';
import { MatchFilterDto } from '../src/modules/matching/dto/match-filter.dto';

describe('MatchingService', () => {
  let service: MatchingService;
  let profileRepository: Repository<Profile>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MatchingService,
        {
          provide: getRepositoryToken(Profile),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<MatchingService>(MatchingService);
    profileRepository = module.get<Repository<Profile>>(getRepositoryToken(Profile));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('filterMatches', () => {
    it('should filter matches based on region and interests', () => {
      const matches: Profile[] = [
        { id: 1, userId: 2, region: '서울', interests: ['reading', 'hiking'] } as Profile,
        { id: 2, userId: 3, region: '부산', interests: ['coding', 'gaming'] } as Profile,
        { id: 3, userId: 4, region: '서울', interests: ['reading', 'coding'] } as Profile,
      ];
      const filters: MatchFilterDto = { region: '서울', interests: ['reading'] };

      const filteredMatches = service.filterMatches(matches, filters);
      expect(filteredMatches).toEqual([matches[0], matches[2]]);
    });

    it('should return all matches if no filters are provided', () => {
      const matches: Profile[] = [
        { id: 1, userId: 2, region: '서울', interests: ['reading', 'hiking'] } as Profile,
        { id: 2, userId: 3, region: '부산', interests: ['coding', 'gaming'] } as Profile,
      ];

      const filteredMatches = service.filterMatches(matches, {});
      expect(filteredMatches).toEqual(matches);
    });
  });


  describe('performance test', () => {
    // ... (Existing performance tests remain unchanged)
  });
});

```