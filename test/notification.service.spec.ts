```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { NotificationService } from '../src/notification/notification.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Notification } from '../src/notification/notification.entity';
import { Repository } from 'typeorm';
import { User } from '../src/users/user.entity';
import { Comment } from '../src/community/comment.entity';
import { Community } from '../src/community/community.entity';
import { NotificationPreferences } from '../src/notification/notification_preferences.entity';

jest.mock('../src/notification/notification.service'); // Mock the service for testing

describe('NotificationService', () => {
  let service: NotificationService;
  let notificationRepository: Repository<Notification>;
  let commentRepository: Repository<Comment>;
  let communityRepository: Repository<Community>;
  let userRepository: Repository<User>;
  let notificationPreferencesRepository: Repository<NotificationPreferences>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationService,
        {
          provide: getRepositoryToken(Notification),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Comment),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Community),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(NotificationPreferences),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<NotificationService>(NotificationService);
    notificationRepository = module.get<Repository<Notification>>(getRepositoryToken(Notification));
    commentRepository = module.get<Repository<Comment>>(getRepositoryToken(Comment));
    communityRepository = module.get<Repository<Community>>(getRepositoryToken(Community));
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    notificationPreferencesRepository = module.get<Repository<NotificationPreferences>>(getRepositoryToken(NotificationPreferences));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendNotification', () => {
    it('should send email notification', async () => {
      const userId = 1;
      const message = 'Test email notification';
      const preferences = { email: true, push: false };

      jest.spyOn(service, 'getPreferences').mockResolvedValue(preferences);
      jest.spyOn(service, 'sendEmail').mockResolvedValue(undefined); // Mock email sending

      await service.sendNotification(userId, message);

      expect(service.getPreferences).toHaveBeenCalledWith(userId);
      expect(service.sendEmail).toHaveBeenCalledWith(userId, message);
      expect(service.sendPushNotification).not.toHaveBeenCalled(); // Ensure push isn't sent
    });


    it('should send push notification', async () => {
      const userId = 1;
      const message = 'Test push notification';
      const preferences = { email: false, push: true };

      jest.spyOn(service, 'getPreferences').mockResolvedValue(preferences);
      jest.spyOn(service, 'sendPushNotification').mockResolvedValue(undefined); // Mock push sending

      await service.sendNotification(userId, message);

      expect(service.getPreferences).toHaveBeenCalledWith(userId);
      expect(service.sendPushNotification).toHaveBeenCalledWith(userId, message);
      expect(service.sendEmail).not.toHaveBeenCalled(); // Ensure email isn't sent
    });

    it('should send both email and push notifications', async () => {
      const userId = 1;
      const message = 'Test both notifications';
      const preferences = { email: true, push: true };

      jest.spyOn(service, 'getPreferences').mockResolvedValue(preferences);
      jest.spyOn(service, 'sendEmail').mockResolvedValue(undefined); // Mock email sending
      jest.spyOn(service, 'sendPushNotification').mockResolvedValue(undefined); // Mock push sending


      await service.sendNotification(userId, message);

      expect(service.getPreferences).toHaveBeenCalledWith(userId);
      expect(service.sendEmail).toHaveBeenCalledWith(userId, message);
      expect(service.sendPushNotification).toHaveBeenCalledWith(userId, message);
    });

    it('should not send any notification if both preferences are false', async () => {
      const userId = 1;
      const message = 'Test no notifications';
      const preferences = { email: false, push: false };

      jest.spyOn(service, 'getPreferences').mockResolvedValue(preferences);
      jest.spyOn(service, 'sendEmail').mockResolvedValue(undefined); // Mock email sending
      jest.spyOn(service, 'sendPushNotification').mockResolvedValue(undefined); // Mock push sending


      await service.sendNotification(userId, message);

      expect(service.getPreferences).toHaveBeenCalledWith(userId);
      expect(service.sendEmail).not.toHaveBeenCalled();
      expect(service.sendPushNotification).not.toHaveBeenCalled();
    });
  });

  // ... other test suites
});

```