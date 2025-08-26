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
    // ... (Existing tests remain unchanged)
  });

  describe('performance test', () => {
    it('should handle a large number of users efficiently', async () => {
      const numUsers = 10000;
      const mockProfiles: Profile[] = [];
      for (let i = 0; i < numUsers; i++) {
        mockProfiles.push({
          id: i + 1,
          userId: i + 2,
          region: '서울',
          interests: ['reading', 'hiking', 'coding', 'gaming'].slice(0, Math.floor(Math.random() * 4)),
        } as Profile);
      }

      jest.spyOn(profileRepository, 'find').mockResolvedValue(mockProfiles);

      const startTime = process.hrtime();
      const filters: MatchFilterDto = { region: '서울', interests: ['reading'] };
      const results = await service.filterMatches(mockProfiles, filters); // Use mockProfiles directly here
      const endTime = process.hrtime(startTime);

      const elapsedTimeMs = (endTime[0] * 1000 + endTime[1] / 1000000);

      console.log(`Matching time for ${numUsers} users: ${elapsedTimeMs} ms`);

      // Add assertions for time and memory usage based on your performance requirements.
      // Example:
      expect(elapsedTimeMs).toBeLessThan(500); // Adjust threshold as needed

      // Memory usage check (requires a memory profiling tool)
      // Example using a hypothetical memory profiling function:
      // const memoryUsage = getMemoryUsage();
      // expect(memoryUsage).toBeLessThan(100 * 1024 * 1024); // Example: less than 100MB
    });
  });
});

```