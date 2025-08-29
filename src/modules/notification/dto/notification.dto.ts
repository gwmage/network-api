// Import necessary decorators and types
import { IsString, IsDate, IsOptional } from 'class-validator';

export class NotificationDto {
  @IsString()
  userId: string;

  @IsString()
  message: string;

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @IsDate()
  @IsOptional()
  updatedAt?: Date;
}
