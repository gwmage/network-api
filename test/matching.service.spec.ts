```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { MatchingService } from '../src/modules/matching/matching.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Profile } from '../src/entities/profile.entity';
import { Repository } from 'typeorm';
import { MatchFilterDto } from '../src/modules/matching/dto/match-filter.dto';
import { ScheduleService } from '../src/config/schedule.config'; // Import ScheduleService

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
});

```