```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { NotificationService } from '../src/notification/notification.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Notification } from '../src/notification/notification.entity';
import { Repository } from 'typeorm';
import { User } from '../src/users/user.entity';

describe('NotificationService', () => {
  let service: NotificationService;
  let notificationRepository: Repository<Notification>;

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
      ],
    }).compile();

    service = module.get<NotificationService>(NotificationService);
    notificationRepository = module.get<Repository<Notification>>(getRepositoryToken(Notification));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a notification', async () => {
    const user = new User();
    user.id = 1;

    const createNotificationDto = {
      userId: 1,
      title: 'Test Notification',
      content: 'This is a test notification.',
    };

    const createdNotification = new Notification();
    createdNotification.id = 1;
    createdNotification.user = user;
    createdNotification.title = createNotificationDto.title;
    createdNotification.content = createNotificationDto.content;


    jest.spyOn(notificationRepository, 'create').mockReturnValue(createdNotification);
    jest.spyOn(notificationRepository, 'save').mockResolvedValue(createdNotification);

    const result = await service.create(createNotificationDto);

    expect(notificationRepository.create).toHaveBeenCalledWith({
      user,
      title: createNotificationDto.title,
      content: createNotificationDto.content,
    });
    expect(notificationRepository.save).toHaveBeenCalledWith(createdNotification);
    expect(result).toEqual(createdNotification);
  });


  it('should find all notifications for a user', async () => {
    const userId = 1;
    const notifications = [new Notification(), new Notification()];

    jest.spyOn(notificationRepository, 'find').mockResolvedValue(notifications);

    const result = await service.findAllByUserId(userId);

    expect(notificationRepository.find).toHaveBeenCalledWith({ where: { user: { id: userId } } });
    expect(result).toEqual(notifications);
  });
});

```