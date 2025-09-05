```typescript
// Existing imports

describe('ReservationService', () => {
  // ... existing tests

  it('should cancel a reservation', async () => {
    // Mock the repository and notification service
    // Create a reservation object

    const result = await service.cancelReservation(reservation.id, reservation.userId, 'Test Reason');

    // Assertions
  });
});

```