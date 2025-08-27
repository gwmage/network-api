```typescript
  describe('cancel', () => {
    it('should cancel a reservation', async () => {
      const reservationId = '1';
      jest.spyOn(service, 'cancelReservation').mockResolvedValue(undefined);

      expect(await controller.cancel(reservationId, 1)).toBeUndefined();
    });

    it('should handle cancellations outside the allowed time window', async () => {
      const reservationId = '2';
      const errorMessage = 'Cancellation outside allowed time window';

      jest.spyOn(service, 'cancelReservation').mockRejectedValue(new Error(errorMessage));

      await expect(controller.cancel(reservationId, 1)).rejects.toThrowError(errorMessage);
    });

    it('should handle invalid reservation IDs', async () => {
      const reservationId = '3';
      const error = new NotFoundException();
      jest.spyOn(service, 'cancelReservation').mockRejectedValue(error);


      await expect(controller.cancel(reservationId, 1)).rejects.toThrowError(error);

    });
  });

```