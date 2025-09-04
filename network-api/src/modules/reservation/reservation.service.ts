import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity';
import { CancelReservationDto } from './dto/cancel-reservation.dto';
import { ReservationStatus } from './enums/reservation-status.enum';
import { NotificationService } from '../notification/notification.service';
import { NotificationEvent } from '../notification/dto/notification-event.enum';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
    @Inject(NotificationService) private notificationService: NotificationService
  ) {}

  async cancelReservation(userId: number, cancelReservationDto: CancelReservationDto): Promise<Reservation> {
    const { reservationId, cancellationReason } = cancelReservationDto;
    const reservation = await this.reservationRepository.findOne({ where: { id: reservationId, user: { id: userId } } });

    if (!reservation) {
      throw new NotFoundException(`Reservation with ID ${reservationId} not found.`);
    }

    const cancellationWindow = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    const now = new Date();
    if (reservation.startTime.getTime() - now.getTime() < cancellationWindow) {
      throw new BadRequestException('Cancellation is not allowed within 24 hours of the reservation start time.');
    }

    reservation.status = ReservationStatus.CANCELLED;
    reservation.cancellationReason = cancellationReason;
    const updatedReservation = await this.reservationRepository.save(reservation);

    await this.notificationService.manageNotificationDelivery(
      NotificationEvent.RESERVATION_CANCELLED,
      [userId],
      { reservationId: reservation.id, cancellationReason }, // Include relevant data in the notification
    );


    return updatedReservation;
  }
 // ... other service methods
}