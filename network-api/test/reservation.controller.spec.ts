// ... existing imports and setup ...
import { ReservationStatus } from '../src/modules/reservation/enums/reservation-status.enum';


// ... existing tests ...

  it('should cancel a reservation', async () => {
    const reservationId = 1; // Replace with a valid reservation ID
    const cancelDto: CancelReservationDto = { reservationId, cancellationReason: 'Test reason' };

    await request(app.getHttpServer())
      .delete(`/reservations/${reservationId}/cancel`)
      .set('Authorization', `Bearer ${accessToken}`) // Set the authorization header
      .send(cancelDto)
      .expect(200)
      .expect(res => {
        expect(res.body.status).toEqual(ReservationStatus.CANCELLED);
        expect(res.body.cancellationReason).toEqual('Test reason');
      });
  });



it('should not cancel a reservation within 24 hours of start time', async () => {
  const reservationId = 2; // Replace with a valid reservation ID for a soon reservation

  // ...  set up mock reservation that starts soon


  const cancelDto: CancelReservationDto = { reservationId };

  await request(app.getHttpServer())
    .delete(`/reservations/${reservationId}/cancel`)
    .set('Authorization', `Bearer ${accessToken}`) // Set the authorization header
    .send(cancelDto)
    .expect(400)
    .expect(res => {
       expect(res.body.message).toEqual('Cancellation is not allowed within 24 hours of the reservation start time.');
    });

});

// ... more tests for invalid reservation IDs, etc.