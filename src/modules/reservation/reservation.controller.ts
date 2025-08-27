```typescript
    @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: Request) {
    try {
      return await this.reservationService.cancelReservation(id, req.user['id']);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

```