import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class ProfileDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsNumber()
  userId: number; 

  @ApiProperty()
  @IsString()
  nickname: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  introduction?: string;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  createdAt?: Date;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  updatedAt?: Date;
}
