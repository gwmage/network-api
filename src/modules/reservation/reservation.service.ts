import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
    private notificationService: NotificationService
  ) {}

  async cancelReservation(reservationId: string, userId: string, cancellationReason?: string) {
    const reservation = await this.reservationRepository.findOne({ where: { id: parseInt(reservationId), userId: parseInt(userId) } });

    if (!reservation) {
      throw new HttpException('Reservation not found', HttpStatus.NOT_FOUND);
    }

    const now = new Date();
    const reservationDateTime = new Date(reservation.reservationDate);
    reservationDateTime.setHours(parseInt(reservation.reservationTime.split(':')[0]), parseInt(reservation.reservationTime.split(':')[1]));
    const twentyFourHoursLater = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    if (reservationDateTime < twentyFourHoursLater) {
      throw new HttpException('Cannot cancel reservation within 24 hours', HttpStatus.BAD_REQUEST);
    }

    reservation.status = 'cancelled';
    reservation.cancellationReason = cancellationReason;

    const result = await this.reservationRepository.save(reservation);
    await this.notificationService.sendCancellationConfirmation(parseInt(userId), parseInt(reservationId));
    return result;
  }
}