```typescript
import { Controller, Delete, Param, Req, HttpException, HttpStatus } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { Request } from 'express';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  
```