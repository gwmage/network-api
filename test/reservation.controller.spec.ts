import { Test, TestingModule } from '@nestjs/testing';
import { ReservationController } from '../src/modules/reservation/reservation.controller';
import { ReservationService } from '../src/modules/reservation/reservation.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Reservation } from '../src/modules/reservation/entities/reservation.entity';
import { Repository } from 'typeorm';
import { CreateReservationDto } from '../src/modules/reservation/dto/create-reservation.dto';
import { NotFoundException } from '@nestjs/common';
import { UpdateReservationDto } from '../src/modules/reservation/dto/update-reservation.dto';

describe('ReservationController', () => {
  let controller: ReservationController;
  let service: ReservationService;
  let reservationRepository: Repository<Reservation>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationController],
      providers: [
        ReservationService,
        {
          provide: getRepositoryToken(Reservation),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<ReservationController>(ReservationController);
    service = module.get<ReservationService>(ReservationService);
    reservationRepository = module.get<Repository<Reservation>>(getRepositoryToken(Reservation));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
