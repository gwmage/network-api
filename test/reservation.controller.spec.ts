import { Test, TestingModule } from '@nestjs/testing';
import { ReservationController } from '../src/reservation/reservation.controller';
import { ReservationService } from '../src/reservation/reservation.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Reservation } from '../src/reservation/reservation.entity';
import { Repository } from 'typeorm';
import { CreateReservationDto } from '../src/reservation/dto/create-reservation.dto';
import { NotFoundException } from '@nestjs/common';

describe('ReservationController', () => {
  let controller: ReservationController;
  let service: ReservationService;

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
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
