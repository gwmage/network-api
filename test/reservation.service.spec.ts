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


describe('ReservationService', () => {
  let service: ReservationService;
  let reservationRepository: Repository<Reservation>;
  let restaurantRepository: Repository<Restaurant>;
  let userRepository: Repository<User>;

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
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Example test case for createReservation
  it('should create a reservation', async () => {
    const mockUser = new User();
    mockUser.id = 1;
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser);

    const mockRestaurant = new Restaurant();
    mockRestaurant.id = 1;
    jest.spyOn(restaurantRepository, 'findOne').mockResolvedValue(mockRestaurant);

    const createReservationDto = {
      restaurantId: 1,
      userId: 1,
      // ... other required fields
    };

    const mockReservation = new Reservation();
    // ... set properties of mockReservation

    jest.spyOn(reservationRepository, 'save').mockResolvedValue(mockReservation);


    const result = await service.createReservation(createReservationDto);
    expect(result).toEqual(mockReservation);

    expect(userRepository.findOne).toHaveBeenCalledWith(createReservationDto.userId);
    expect(restaurantRepository.findOne).toHaveBeenCalledWith(createReservationDto.restaurantId);

  });


  // Add more test cases for other service methods (e.g., findAll, findOne, update, remove) and error handling scenarios (e.g., restaurant not found, user not found)
});
```