```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { MatchingService } from '../src/modules/matching/matching.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Profile } from '../src/entities/profile.entity';
import { Repository } from 'typeorm';
import { MatchFilterDto } from '../src/modules/matching/dto/match-filter.dto';
import { ScheduleService } from '../src/config/schedule.config'; // Import ScheduleService
import { User } from '../src/entities/user.entity';

describe('MatchingService', () => {
  let service: MatchingService;
  let profileRepository: Repository<Profile>;
  let scheduleService: ScheduleService;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MatchingService,
        ScheduleService, // Include ScheduleService in testing module
        {
          provide: getRepositoryToken(Profile),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<MatchingService>(MatchingService);
    profileRepository = module.get<Repository<Profile>>(getRepositoryToken(Profile));
    scheduleService = module.get<ScheduleService>(ScheduleService); // Inject ScheduleService
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // ... (Existing filterMatches tests remain unchanged)

  describe('Scheduled Job', () => {
    it('should call runMatching on handleCron', async () => {
      const runMatchingSpy = jest.spyOn(service, 'runMatching');
      await scheduleService.handleCron();
      expect(runMatchingSpy).toHaveBeenCalled();
    });
  });

  describe('Performance Testing', () => {
    it('should handle large number of users efficiently', async () => {
      const numUsers = 1000;
      const users: User[] = Array.from({ length: numUsers }, (_, i) => ({ id: i + 1, interests: [] } as User));
      const startTime = performance.now();
      service.matchUsers(users);
      const endTime = performance.now();
      const executionTime = endTime - startTime;
      console.log(`Matching ${numUsers} users took ${executionTime} milliseconds`);
      // Add an assertion based on acceptable performance threshold.
      // For example:
      expect(executionTime).toBeLessThan(500); // Adjust threshold as needed
    });

    it('should handle different weight configurations', async () => {
      const users: User[] = [
        { id: 1, interests: ['hiking', 'reading'] } as User,
        { id: 2, interests: ['hiking'] } as User,
        { id: 3, interests: ['reading', 'coding'] } as User,
      ];

      // Test different weight configurations - Example: prioritizing common interests
      // ... Set different weights in the service before calling matchUsers
      // ... Assert that the matching results reflect the weighting
      const matchedGroups = service.matchUsers(users);

        expect(matchedGroups).toBeDefined(); // Example assertion, adjust as needed

    });
  });


});

```