```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { ReservationController } from '../src/modules/reservation/reservation.controller';
import { RestaurantReservationService } from '../src/modules/reservation/restaurant-reservation.service';
import { ReservationService } from '../src/modules/reservation/reservation.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Reservation } from '../src/modules/reservation/entities/reservation.entity';
import { Repository } from 'typeorm';
import { CreateReservationDto } from '../src/modules/reservation/dto/create-reservation.dto';
import { NotFoundException } from '@nestjs/common';
import { Restaurant } from '../src/modules/restaurant/entities/restaurant.entity';
import { User } from '../src/modules/user/entities/user.entity';
import { UpdateReservationDto } from '../src/modules/reservation/dto/update-reservation.dto';

describe('ReservationController', () => {
  let controller: ReservationController;
  let service: ReservationService;
  let restaurantReservationService: RestaurantReservationService;
  let reservationRepository: Repository<Reservation>;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationController],
      providers: [
        ReservationService,
        RestaurantReservationService,
        {
          provide: getRepositoryToken(Reservation),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Restaurant),
          useClass: Repository
        },
        {
          provide: getRepositoryToken(User),
          useClass: Repository
        }
      ],
    }).compile();

    controller = module.get<ReservationController>(ReservationController);
    service = module.get<ReservationService>(ReservationService);
    restaurantReservationService = module.get<RestaurantReservationService>(RestaurantReservationService);
    reservationRepository = module.get<Repository<Reservation>>(getRepositoryToken(Reservation));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createRestaurantReservation', () => {
    it('should create a restaurant reservation', async () => {
      const createReservationDto: CreateReservationDto = { restaurantId: '1', userId: '1', dateTime: new Date() };
      const createdReservation = { id: '1', ...createReservationDto };

      jest.spyOn(restaurantReservationService, 'create').mockResolvedValue(createdReservation);

      expect(await controller.createRestaurantReservation(createReservationDto)).toEqual(createdReservation);
    });

    it('should handle errors when creating a restaurant reservation', async () => {
      const createReservationDto: CreateReservationDto = { restaurantId: '1', userId: '1', dateTime: new Date() };
      const errorMessage = 'Error creating reservation';

      jest.spyOn(restaurantReservationService, 'create').mockRejectedValue(new Error(errorMessage));

      await expect(controller.createRestaurantReservation(createReservationDto)).rejects.toThrowError(errorMessage);

    });
  });

  describe('findOne', () => {
    it('should return a reservation by id', async () => {
      const reservation = { id: '1', restaurantId: '1', userId: '1', dateTime: new Date() };
      jest.spyOn(service, 'findOne').mockResolvedValue(reservation);

      expect(await controller.findOne('1')).toEqual(reservation);
    });


    it('should throw NotFoundException if reservation does not exist', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(undefined);

      await expect(controller.findOne('1')).rejects.toThrow(NotFoundException);
    });

  });


  describe('update', () => {
    it('should update a reservation', async () => {
      const reservationId = '1';
      const updateReservationDto: UpdateReservationDto = { dateTime: new Date() };
      const updatedReservation = { id: reservationId, ...updateReservationDto };
      jest.spyOn(service, 'update').mockResolvedValue(updatedReservation);

      expect(await controller.update(reservationId, updateReservationDto)).toEqual(updatedReservation);

    });

    it('should throw NotFoundException if reservation does not exist', async () => {
      const reservationId = '1';
      const updateReservationDto: UpdateReservationDto = { dateTime: new Date() };
      jest.spyOn(service, 'update').mockRejectedValue(new NotFoundException());

      await expect(controller.update(reservationId, updateReservationDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a reservation', async () => {
      const reservationId = '1';
      jest.spyOn(service, 'remove').mockResolvedValue(undefined);

      expect(await controller.remove(reservationId)).toBeUndefined();
    });
  });
});

```