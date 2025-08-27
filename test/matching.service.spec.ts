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

  describe('filterMatches', () => {
    it('should filter matches based on provided criteria', async () => {
      const userProfile = { id: 1, userId: 1, interests: ['hiking', 'reading'], region: '서울' } as Profile;
      const profiles = [
        { id: 2, userId: 2, interests: ['hiking'], region: '서울' },
        { id: 3, userId: 3, interests: ['reading', 'coding'], region: '경기' },
        { id: 4, userId: 4, interests: ['hiking', 'reading', 'coding'], region: '서울' },
      ] as Profile[];

      const filter: MatchFilterDto = { interests: ['hiking'], regions: ['서울'] };
      const filteredMatches = service.filterMatches(userProfile, profiles, filter);
      expect(filteredMatches).toEqual([
        { id: 2, userId: 2, interests: ['hiking'], region: '서울' },
      ]);
    });

    it('should return an empty array if no match is found', async () => {
      const userProfile = { id: 1, userId: 1, interests: ['hiking', 'reading'] } as Profile;
      const profiles = [
        { id: 2, userId: 2, interests: ['hiking'] },
        { id: 3, userId: 3, interests: ['reading', 'coding'] },
      ] as Profile[];
      const filter: MatchFilterDto = { interests: ['coding'], regions: ['경기'] };
      const filteredMatches = service.filterMatches(userProfile, profiles, filter);
      expect(filteredMatches).toEqual([]);
    });

    it('should handle empty filter values', () => {
      const userProfile = { id: 1, userId: 1, interests: ['hiking', 'reading'] } as Profile;
      const profiles = [
        { id: 2, userId: 2, interests: ['hiking'] },
        { id: 3, userId: 3, interests: ['reading', 'coding'] },
      ] as Profile[];

      const filter: MatchFilterDto = { interests: [], regions: [] };
      const filteredMatches = service.filterMatches(userProfile, profiles, filter);
      expect(filteredMatches).toEqual(profiles)
    })

    it('should handle null filter', () => {
      const userProfile = { id: 1, userId: 1, interests: ['hiking', 'reading'] } as Profile;
      const profiles = [
        { id: 2, userId: 2, interests: ['hiking'] },
        { id: 3, userId: 3, interests: ['reading', 'coding'] },
      ] as Profile[];

      const filter = null
      const filteredMatches = service.filterMatches(userProfile, profiles, filter);
      expect(filteredMatches).toEqual(profiles)


    })

  });


  describe('Scheduled Job', () => {
    it('should call runMatching on handleCron', async () => {
      const runMatchingSpy = jest.spyOn(service, 'runMatching');
      await scheduleService.handleCron();
      expect(runMatchingSpy).toHaveBeenCalled();
    });
  });
});

```