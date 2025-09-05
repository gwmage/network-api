```typescript
// Existing imports...

describe('ReservationController', () => {
  // ... existing tests ...

  it('should cancel a reservation', async () => {
    // ... setup (create a reservation in the database) ...

    const cancelReservationDto = { cancellationReason: 'Test reason' };

    await request(app.getHttpServer())
      .delete(`/reservations/${reservationId}`)
      .send(cancelReservationDto)
      .expect(200)
      .expect({ message: 'Reservation cancelled successfully' });

    // ... assert that the reservation status is 'cancelled' and cancellationReason is saved ...
  });

  // Add more tests for other scenarios ...
});

```