```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { MatchingService } from '../src/matching/matching.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Profile } from '../src/profile/profile.entity';
import { Repository } from 'typeorm';

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
    const mockMatches = [
      { userId: 1, score: 0.9, interests: ['reading', 'hiking'], region: '서울' },
      { userId: 2, score: 0.8, interests: ['coding', 'gaming'], region: '부산' },
      { userId: 3, score: 0.7, interests: ['reading', 'coding'], region: '서울' },
      { userId: 4, score: 0.6, interests: ['hiking', 'gaming'], region: '대구' },
    ];

    it('should return all matches when no filters are provided', () => {
      expect(service.filterMatches(mockMatches, {})).toEqual(mockMatches);
    });

    it('should filter by single selection', () => {
      expect(service.filterMatches(mockMatches, { interests: ['reading'] })).toEqual([
        mockMatches[0],
        mockMatches[2],
      ]);
      expect(service.filterMatches(mockMatches, { region: '서울' })).toEqual([
        mockMatches[0],
        mockMatches[2],
      ]);
    });

    it('should filter by multiple selections', () => {
      expect(service.filterMatches(mockMatches, { interests: ['reading', 'coding'] })).toEqual([
        mockMatches[0],
        mockMatches[2],
      ]);
      expect(service.filterMatches(mockMatches, { region: ['서울', '부산'] })).toEqual([
        mockMatches[0],
        mockMatches[1],
        mockMatches[2],
      ]);
    });


    it('should handle empty selections', () => {
      expect(service.filterMatches(mockMatches, { interests: [], region: [] })).toEqual(mockMatches);
    });

    it('should handle invalid input', () => {
      expect(service.filterMatches(mockMatches, { interests: null, region: undefined })).toEqual(mockMatches);
      expect(service.filterMatches(mockMatches, { invalidField: 'someValue' } as any)).toEqual(mockMatches);

    });
  });
});

```