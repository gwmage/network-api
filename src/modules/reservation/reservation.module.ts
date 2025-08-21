```typescript
import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './reservation.entity';
import { Restaurant } from '../restaurant/restaurant.entity';
import { User } from '../users/user.entity';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([Reservation, Restaurant, User]),
  ],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
```