```typescript
  describe('cancel', () => {
    it('should cancel a reservation', async () => {
      const reservationId = 1;
      const userId = 1;
      const mockReservation = { id: reservationId, userId };
      jest.spyOn(reservationRepository, 'findOne').mockResolvedValue(mockReservation);
      jest.spyOn(reservationRepository, 'softRemove').mockResolvedValue(mockReservation);


      const result = await service.cancel(reservationId, userId);

      expect(result).toEqual(mockReservation);
      expect(reservationRepository.findOne).toHaveBeenCalledWith({ where: { id: reservationId, userId } });
      expect(reservationRepository.softRemove).toHaveBeenCalledWith(mockReservation);

    });

    it('should throw NotFoundException if reservation does not exist', async () => {
      const reservationId = 1;
      const userId = 1;

      jest.spyOn(reservationRepository, 'findOne').mockResolvedValue(undefined);

      await expect(service.cancel(reservationId, userId)).rejects.toThrowError('Reservation not found');
    });

    it('should throw ForbiddenException if user is not the owner of the reservation', async () => {
      const reservationId = 1;
      const userId = 1;
      const mockReservation = { id: reservationId, userId: 2 }; // Different user ID
      jest.spyOn(reservationRepository, 'findOne').mockResolvedValue(mockReservation);


      await expect(service.cancel(reservationId, userId)).rejects.toThrowError('You are not authorized to cancel this reservation');
    });
  });

```