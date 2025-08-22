import { Test, TestingModule } from '@nestjs/testing';
import { ReservationController } from '../src/modules/reservation/reservation.controller';
import { ReservationService } from '../src/modules/reservation/reservation.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Reservation } from '../src/modules/reservation/entities/reservation.entity';
import { Repository } from 'typeorm';
import { CreateReservationDto } from '../src/modules/reservation/dto/create-reservation.dto';
// ... other imports

describe('ReservationController', () => {
  // ... your test code ...
});