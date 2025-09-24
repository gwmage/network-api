import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { Restaurant } from './entities/restaurant.entity';
import { User } from '../users/entities/user.entity';
import { RestaurantReservationService } from './restaurant-reservation.service';
import { RestaurantReservationController } from './restaurant-reservation.controller';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([Reservation, Restaurant, User]),
  ],
  controllers: [ReservationController, RestaurantReservationController],
  providers: [ReservationService, RestaurantReservationService],
})
export class ReservationModule {}
