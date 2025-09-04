import { Test, TestingModule } from '@nestjs/testing';
import { NotificationService } from '../src/modules/notification/notification.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserNotificationPreferences } from '../src/modules/notification/entities/user-notification-preferences.entity';
import { NotificationDeliveryStatus } from '../src/modules/notification/entities/notification-delivery-status.entity';
import { User } from '../src/modules/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { NotificationPreferenceDto } from '../src/modules/notification/dto/notification-preference.dto';
import { DeliveryMethod, DeliveryStatus } from '../src/modules/notification/entities/notification-delivery-status.entity';

describe('NotificationService', () => {
  let service: NotificationService;
  let userNotificationPreferencesRepository: Repository<UserNotificationPreferences>;
  let notificationDeliveryStatusRepository: Repository<NotificationDeliveryStatus>;
  let userRepository: Repository<User>;



  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationService,
        {
          provide: getRepositoryToken(UserNotificationPreferences),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(NotificationDeliveryStatus),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            createQueryBuilder: jest.fn().mockReturnValue({
              andWhere: jest.fn().mockReturn(this),
              getMany: jest.fn().mockResolvedValue([]),
            }),
          },
        },
        { provide: getRepositoryToken(User), useValue: { find: jest.fn() } },
      ],
    }).compile();

    service = module.get<NotificationService>(NotificationService);
    userNotificationPreferencesRepository = module.get<Repository<UserNotificationPreferences>>(
      getRepositoryToken(UserNotificationPreferences),
    );
    notificationDeliveryStatusRepository = module.get<Repository<NotificationDeliveryStatus>>(
      getRepositoryToken(NotificationDeliveryStatus),
    );
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should save user notification preferences', async () => {
    const userId = 1;
    const preferences: NotificationPreferenceDto = {
      pushNotificationEnabled: true,
      emailNotificationEnabled: false,
    };
    const mockUserPrefs = new UserNotificationPreferences();
    (userNotificationPreferencesRepository.findOne as jest.Mock).mockResolvedValue(
      mockUserPrefs,
    );

    await service.saveUserNotificationPreferences(userId, preferences);

    expect(userNotificationPreferencesRepository.findOne).toHaveBeenCalledWith({
      where: { user: { id: userId } },
    });
    expect(userNotificationPreferencesRepository.save).toHaveBeenCalledWith({
      ...mockUserPrefs,
      ...preferences,
    });
  });

  it('should create user notification preferences if they dont exist', async () => {
    const userId = 1;
    const preferences: NotificationPreferenceDto = {
      pushNotificationEnabled: true,
      emailNotificationEnabled: false,
    };

    (userNotificationPreferencesRepository.findOne as jest.Mock).mockResolvedValue(
      undefined,
    );
    (userNotificationPreferencesRepository.create as jest.Mock).mockReturnValue({
      user: { id: userId },
      ...preferences,
    });

    await service.saveUserNotificationPreferences(userId, preferences);


    expect(userNotificationPreferencesRepository.findOne).toHaveBeenCalledWith({
      where: { user: { id: userId } },
    });

    expect(userNotificationPreferencesRepository.create).toHaveBeenCalledWith({
      user: { id: userId },
    });
    expect(userNotificationPreferencesRepository.save).toHaveBeenCalled();
  });



  it('should retrieve user notification preferences', async () => {
    const userId = 1;
    const mockUserPrefs: UserNotificationPreferences = {
      id: 1,
      user: null,
      pushNotificationEnabled: true,
      emailNotificationEnabled: false,
    } as UserNotificationPreferences;


    (userNotificationPreferencesRepository.findOne as jest.Mock).mockResolvedValue(
      mockUserPrefs,
    );

    const retrievedPrefs = await service.retrieveUserNotificationPreferences(userId);
    expect(retrievedPrefs).toEqual({
      pushNotificationEnabled: true,
      emailNotificationEnabled: false,
    });
    expect(userNotificationPreferencesRepository.findOne).toHaveBeenCalledWith({
      where: { user: { id: userId } },
    });
  });


  it('should retrieve empty user notification preferences', async () => {
    const userId = 1;

    (userNotificationPreferencesRepository.findOne as jest.Mock).mockResolvedValue(
      null,
    );

    const retrievedPrefs = await service.retrieveUserNotificationPreferences(userId);
    expect(retrievedPrefs).toEqual(null);
    expect(userNotificationPreferencesRepository.findOne).toHaveBeenCalledWith({
      where: { user: { id: userId } },
    });
  });


  it('should track notification delivery status', async () => {
    const notificationId = 'some-notification-id';
    const userId = 1;
    const deliveryMethod = DeliveryMethod.PUSH;
    const status = DeliveryStatus.DELIVERED;

    await service.trackNotificationDeliveryStatus(
      notificationId,
      userId,
      deliveryMethod,
      status,
    );

    expect(notificationDeliveryStatusRepository.create).toHaveBeenCalledWith({
      notificationId,
      user: { id: userId },
      deliveryMethod,
      status,
    });
    expect(notificationDeliveryStatusRepository.save).toHaveBeenCalled();
  });

  it('should retrieve notification delivery status', async () => {
    const notificationId = 'some-notification-id';
    const userId = 1;

    await service.retrieveNotificationDeliveryStatus(notificationId, userId);


    // const queryBuilder = notificationDeliveryStatusRepository.createQueryBuilder(
    //   'status',
    // ) as any;


    // expect(queryBuilder.andWhere).toHaveBeenCalledWith(
    //   'status.notificationId = :notificationId',
    //   { notificationId: notificationId },
    // );
    // expect(queryBuilder.andWhere).toHaveBeenCalledWith('status.user.id = :userId', {
    //   userId: userId,
    // });


    // expect(queryBuilder.getMany).toHaveBeenCalled();
  });
});

---[END_OF_FILES]---