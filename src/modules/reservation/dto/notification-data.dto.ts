import { ApiProperty } from "@nestjs/swagger";

export class NotificationDataDto {
    @ApiProperty()
    reservationId: number;

    @ApiProperty()
    userId: number;
}