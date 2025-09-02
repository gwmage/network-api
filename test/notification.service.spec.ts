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

describe('NotificationService', () => {
  let service: NotificationService;
  let notificationRepository: Repository<Notification>;
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
    notificationPreferencesRepository = module.get<Repository<NotificationPreferences>>(getRepositoryToken(NotificationPreferences));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendNotification', () => {
    it('should send email notification', async () => {
      const userId = 1;
      const message = 'Test email notification';

      jest.spyOn(service, 'getNotificationPreferences').mockResolvedValue({ pushNotifications: false, emailNotifications: true });
      jest.spyOn(service, 'sendEmailNotification').mockResolvedValue(undefined);

      await service.sendNotification(userId, message);

      expect(service.getNotificationPreferences).toHaveBeenCalledWith(userId);
      expect(service.sendEmailNotification).toHaveBeenCalledWith(userId, message);
      expect(service.sendPushNotification).not.toHaveBeenCalled();
    });

    it('should send push notification', async () => {
      const userId = 1;
      const message = 'Test push notification';

      jest.spyOn(service, 'getNotificationPreferences').mockResolvedValue({ pushNotifications: true, emailNotifications: false });
      jest.spyOn(service, 'sendPushNotification').mockResolvedValue(undefined);

      await service.sendNotification(userId, message);

      expect(service.getNotificationPreferences).toHaveBeenCalledWith(userId);
      expect(service.sendPushNotification).toHaveBeenCalledWith(userId, message);
      expect(service.sendEmailNotification).not.toHaveBeenCalled();
    });

    it('should send both email and push notifications', async () => {
      const userId = 1;
      const message = 'Test both notifications';

      jest.spyOn(service, 'getNotificationPreferences').mockResolvedValue({ pushNotifications: true, emailNotifications: true });
      jest.spyOn(service, 'sendEmailNotification').mockResolvedValue(undefined);
      jest.spyOn(service, 'sendPushNotification').mockResolvedValue(undefined);

      await service.sendNotification(userId, message);

      expect(service.getNotificationPreferences).toHaveBeenCalledWith(userId);
      expect(service.sendEmailNotification).toHaveBeenCalledWith(userId, message);
      expect(service.sendPushNotification).toHaveBeenCalledWith(userId, message);
    });

    it('should not send any notification if both preferences are false', async () => {
      const userId = 1;
      const message = 'Test no notifications';

      jest.spyOn(service, 'getNotificationPreferences').mockResolvedValue({ pushNotifications: false, emailNotifications: false });
      jest.spyOn(service, 'sendEmailNotification').mockResolvedValue(undefined);
      jest.spyOn(service, 'sendPushNotification').mockResolvedValue(undefined);

      await service.sendNotification(userId, message);

      expect(service.getNotificationPreferences).toHaveBeenCalledWith(userId);
      expect(service.sendEmailNotification).not.toHaveBeenCalled();
      expect(service.sendPushNotification).not.toHaveBeenCalled();
    });
  });
});

```