```typescript
// Create tests here
import { Test, TestingModule } from '@nestjs/testing';
import { ReservationController } from '../src/modules/reservation/reservation.controller';
import { ReservationService } from '../src/modules/reservation/reservation.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Reservation } from '../src/modules/reservation/entities/reservation.entity';
import { Repository } from 'typeorm';
import { NotificationService } from '../src/modules/notification/notification.service';
import { HttpException } from '@nestjs/common';


describe('ReservationController', () => {
  let controller: ReservationController;
  let service: ReservationService;
  let notificationService: NotificationService

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationController],
      providers: [
        ReservationService,
        NotificationService,
        {
          provide: getRepositoryToken(Reservation),
          useClass: Repository,
        },
      ],
    }).compile();


    controller = module.get<ReservationController>(ReservationController);
    service = module.get<ReservationService>(ReservationService);
    notificationService = module.get<NotificationService>(NotificationService)
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  it('should cancel a reservation', async () => {
    const mockRequest = { user: { userId: '1' } } as any;
    const mockResponse = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
    const reservationId = '1';
    const cancellationReason = 'Test reason';

    const cancelReservationSpy = jest.spyOn(service, 'cancelReservation').mockResolvedValue(undefined);

    await controller.cancelReservation(reservationId, {cancellationReason}, mockRequest, mockResponse);

    expect(cancelReservationSpy).toHaveBeenCalledWith(parseInt(reservationId), parseInt(mockRequest.user.userId), cancellationReason);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Reservation cancelled successfully' });

  });

  it('should handle errors when cancelling a reservation', async () => {
    const mockRequest = { user: { userId: '1' } } as any;
    const mockResponse = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
    const reservationId = '1';

    const error = new HttpException('Reservation not found', 404);
    const cancelReservationSpy = jest.spyOn(service, 'cancelReservation').mockRejectedValue(error);


    await controller.cancelReservation(reservationId, {}, mockRequest, mockResponse);

    expect(cancelReservationSpy).toHaveBeenCalledWith(parseInt(reservationId), parseInt(mockRequest.user.userId), undefined);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Reservation not found' });


  });

  it('should handle generic errors when cancelling a reservation', async () => {
    const mockRequest = { user: { userId: '1' } } as any;
    const mockResponse = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
    const reservationId = '1';

    const error = new Error('Something went wrong');
    const cancelReservationSpy = jest.spyOn(service, 'cancelReservation').mockRejectedValue(error);


    await controller.cancelReservation(reservationId, {}, mockRequest, mockResponse);


    expect(cancelReservationSpy).toHaveBeenCalledWith(parseInt(reservationId), parseInt(mockRequest.user.userId), undefined);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Failed to cancel reservation' });
  });
});
```
---[@document]---
```
## DELETE /reservations/:id

Cancels a reservation.

**Request Parameters:**

* `id` (path): The ID of the reservation to cancel.
* `cancellationReason` (body, optional): The reason for cancellation.

**Request Body:**

```json
{
  "cancellationReason": "string" 
}
```

**Response:**

* **200 OK:** Reservation cancelled successfully.
```json
{
  "message": "Reservation cancelled successfully"
}
```

* **400 Bad Request:** Cannot cancel reservation within 24 hours.
```json
{
  "message": "Cannot cancel reservation within 24 hours"
}
```

* **404 Not Found:** Reservation not found.
```json
{
  "message": "Reservation not found"
}
```

* **500 Internal Server Error:** Failed to cancel reservation.
```json
{
  "message": "Failed to cancel reservation"
}
```
```
---[END_OF_FILES]---