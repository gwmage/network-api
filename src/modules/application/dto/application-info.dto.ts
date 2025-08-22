import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsDate, IsDateString } from 'class-validator';

export class ApplicationInfoDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  status: string;

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  createdAt?: Date;

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  updatedAt?: Date;
}

export class GetApplicationInfoListRequestDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name?: string;
}