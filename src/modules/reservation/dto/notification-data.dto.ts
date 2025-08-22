import { ApiProperty } from '@nestjs/swagger';

export class NotificationDataDto {
  @ApiProperty()
  reservationId: string;
}