import { Test, TestingModule } from '@nestjs/testing';
import { INMMock } from '@shared/common/testing/inm.mock';
import { ReservationController } from '@modules/reservation/reservation.controller';
import { ReservationService } from '@modules/reservation/reservation.service';
import { CreateReservationDto } from '@modules/reservation/dto/create-reservation.dto';
import { UpdateReservationDto } from '@modules/reservation/dto/update-reservation.dto';
import { CancelReservationDto } from '@modules/reservation/dto/cancel-reservation.dto';
import { of } from 'rxjs';
import * as dayjs from 'dayjs';

// Mock dependencies and setup testing module
jest.mock('@modules/reservation/reservation.service');
jest.mock('@shared/common/testing/inm.mock');

describe('ReservationController', () => {
  let controller: ReservationController;
  let service: ReservationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationController],
      providers: [
        {
          provide: ReservationService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            cancelReservation: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ReservationController>(ReservationController);
    service = module.get<ReservationService>(ReservationService);
  });

  // ... rest of your test code
});
