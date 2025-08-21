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
      date: new Date(),
      time: '18:00',
      partySize: 2,
    };

    const mockReservation = new Reservation();
    mockReservation.id = 1;
    jest.spyOn(reservationRepository, 'save').mockResolvedValue(mockReservation);

    const result = await service.createReservation(createReservationDto);
    expect(result).toEqual(mockReservation);
    expect(userRepository.findOne).toHaveBeenCalledWith(createReservationDto.userId);
    expect(restaurantRepository.findOne).toHaveBeenCalledWith(createReservationDto.restaurantId);
  });

  it('should find all reservations', async () => {
    const mockReservations = [new Reservation(), new Reservation()];
    jest.spyOn(reservationRepository, 'find').mockResolvedValue(mockReservations);

    const result = await service.findAll();
    expect(result).toEqual(mockReservations);
    expect(reservationRepository.find).toHaveBeenCalled();
  });


  it('should find a reservation by id', async () => {
    const mockReservation = new Reservation();
    mockReservation.id = 1;

    jest.spyOn(reservationRepository, 'findOne').mockResolvedValue(mockReservation);

    const result = await service.findOne(1);
    expect(result).toEqual(mockReservation);
    expect(reservationRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 }, relations: ['restaurant', 'user'] });
  });

  it('should update a reservation', async () => {
    const mockReservation = new Reservation();
    mockReservation.id = 1;
    jest.spyOn(reservationRepository, 'findOne').mockResolvedValue(mockReservation);
    jest.spyOn(reservationRepository, 'save').mockResolvedValue(mockReservation);

    const updateReservationDto = {
      date: new Date(),
      time: '19:00',
      partySize: 4,
    };

    const result = await service.update(1, updateReservationDto);
    expect(result).toEqual(mockReservation);

  });


  it('should remove a reservation', async () => {
    jest.spyOn(reservationRepository, 'delete').mockResolvedValue({ affected: 1 });
    await service.remove(1);
    expect(reservationRepository.delete).toHaveBeenCalledWith(1);

  });



});

```