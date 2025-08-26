```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { MatchingService } from '../src/modules/matching/matching.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Profile } from '../src/entities/profile.entity';
import { Repository } from 'typeorm';
import { MatchFilterDto } from '../src/modules/matching/dto/match-filter.dto';
import { NotificationService } from '../src/modules/notification/notification.service';

describe('MatchingService', () => {
  let service: MatchingService;
  let profileRepository: Repository<Profile>;
  let notificationService: NotificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MatchingService,
        {
          provide: getRepositoryToken(Profile),
          useClass: Repository,
        },
        {
          provide: NotificationService,
          useValue: {
            sendMatchNotification: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MatchingService>(MatchingService);
    profileRepository = module.get<Repository<Profile>>(getRepositoryToken(Profile));
    notificationService = module.get<NotificationService>(NotificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('filterMatches', () => {
    // ... (Existing filterMatches tests remain unchanged)
  });


  describe('performance test', () => {
    // ... (Existing performance tests remain unchanged)
  });

  describe('matchUsers', () => {
    it('should send notification after successful match', async () => {
      const userProfile = { id: 1, userId: 1 } as Profile;
      const matchedProfiles = [{ id: 2, userId: 2 } as Profile];
      jest.spyOn(profileRepository, 'findOne').mockResolvedValue(userProfile);
      jest.spyOn(service, 'findMatches').mockResolvedValue(matchedProfiles);

      await service.matchUsers(1);

      expect(notificationService.sendMatchNotification).toHaveBeenCalledWith(
        userProfile,
        matchedProfiles,
      );
    });
  });
});

```