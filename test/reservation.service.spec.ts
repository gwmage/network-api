```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { ReservationService } from '../src/reservation/reservation.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Reservation } from '../src/reservation/reservation.entity';
import { Repository } from 'typeorm';
import { Restaurant } from '../src/restaurant/restaurant.entity';
import { User } from '../src/users/user.entity';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { HttpStatus } from '@nestjs/common';

describe('ReservationService', () => {
  let service: ReservationService;
  let reservationRepository: Repository<Reservation>;
  let restaurantRepository: Repository<Restaurant>;
  let userRepository: Repository<User>;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        ReservationService,
        ConfigService,
        {
          provide: getRepositoryToken(Reservation),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Restaurant),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ReservationService>(ReservationService);
    reservationRepository = module.get<Repository<Reservation>>(getRepositoryToken(Reservation));
    restaurantRepository = module.get<Repository<Restaurant>>(getRepositoryToken(Restaurant));
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a reservation', async () => {
    // ... (Existing test case)
  });

  it('should handle restaurant not found error', async () => {
    jest.spyOn(restaurantRepository, 'findOne').mockResolvedValue(undefined);

    await expect(service.createReservation({ restaurantId: 1, userId: 1 } as any)).rejects.toThrowError(
      'Restaurant not found',
    );
  });

  it('should handle user not found error', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);
    jest.spyOn(restaurantRepository, 'findOne').mockResolvedValue(new Restaurant());

    await expect(service.createReservation({ restaurantId: 1, userId: 1 } as any)).rejects.toThrowError('User not found');

  });


  it('should send notification on successful reservation', async () => {
      // ...mocks for user, restaurant and reservation repositories
      jest.spyOn(configService, 'get').mockReturnValue('mock_notification_url');
      const httpService = module.get<HttpService>(HttpService);
      const postSpy = jest.spyOn(httpService, 'post').mockResolvedValue({status: HttpStatus.OK} as any);

      await service.createReservation({restaurantId: 1, userId: 1} as any);

      expect(postSpy).toHaveBeenCalledWith('mock_notification_url', expect.any(Object));

  });


  it('should handle notification service error', async () => {
     // ...mocks for user, restaurant and reservation repositories
      jest.spyOn(configService, 'get').mockReturnValue('mock_notification_url');

      const httpService = module.get<HttpService>(HttpService);
      jest.spyOn(httpService, 'post').mockRejectedValue(new Error('Notification service error'));


      await expect(service.createReservation({restaurantId: 1, userId:1} as any)).rejects.toThrowError('Failed to send notification');

  });



  // ... other test cases
});

```