import { Test, TestingModule } from '@nestjs/testing';
import { NotificationController } from '../src/modules/notification/notification.controller';
import { NotificationService } from '../src/modules/notification/notification.service';
import { NotificationPreferenceDto } from '../src/modules/notification/dto/notification-preference.dto';
import { NotificationDeliveryStatus } from '../src/modules/notification/entities/notification-delivery-status.entity';


describe('NotificationController', () => {
  let controller: NotificationController;
  let service: NotificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationController],
      providers: [
        {
          provide: NotificationService,
          useValue: {
            saveUserNotificationPreferences: jest.fn().mockResolvedValue(undefined),
            retrieveUserNotificationPreferences: jest
              .fn()
              .mockResolvedValue({
                pushNotificationEnabled: true,
                emailNotificationEnabled: false,
              }),
            manageNotificationDelivery: jest.fn().mockResolvedValue(undefined),
            retrieveNotificationDeliveryStatus: jest.fn().mockResolvedValue([]),

          },
        },
      ],
    }).compile();

    controller = module.get<NotificationController>(NotificationController);
    service = module.get<NotificationService>(NotificationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  it('should save user notification preferences', async () => {
    const userId = 1;
    const preferences: NotificationPreferenceDto = {
      pushNotificationEnabled: true,
      emailNotificationEnabled: false,
    };
    await controller.saveUserNotificationPreferences(userId, preferences);
    expect(service.saveUserNotificationPreferences).toHaveBeenCalledWith(userId, preferences);
  });


  it('should retrieve user notification preferences', async () => {
    const userId = 1;
    const preferences: NotificationPreferenceDto = {
      pushNotificationEnabled: true,
      emailNotificationEnabled: false,
    };
    expect(await controller.retrieveUserNotificationPreferences(userId)).toEqual(
      preferences,
    );
    expect(service.retrieveUserNotificationPreferences).toHaveBeenCalledWith(userId);
  });

  it('should call manage notification delivery', async () => {
    await controller.manageNotificationDelivery();
    expect(service.manageNotificationDelivery).toHaveBeenCalled();
  });

  it('should retrieve notification delivery status', async () => {
    const notificationId = 'some-notification-id';
    const userId = 1;

    const mockStatus: NotificationDeliveryStatus[] = []; // Populate mock status data if needed

    expect(
      await controller.retrieveNotificationDeliveryStatus(notificationId, userId),
    ).toEqual(mockStatus);
    expect(service.retrieveNotificationDeliveryStatus).toHaveBeenCalledWith(
      notificationId,
      userId,
    );
  });


});