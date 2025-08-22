import { Test, TestingModule } from '@nestjs/testing';
import { ReservationController } from '../src/modules/reservation/reservation.controller';
import { ReservationService } from '../src/modules/reservation/reservation.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Reservation } from '../src/modules/reservation/entities/reservation.entity';
import { Repository } from 'typeorm';
import { CreateReservationDto } from '../src/modules/reservation/dto/create-reservation.dto';
import { NotFoundException } from '@nestjs/common';

describe('ReservationController', () => {
  let controller: ReservationController;

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
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
