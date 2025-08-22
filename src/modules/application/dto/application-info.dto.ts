import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

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

export class GetApplicationInfoListRequestDto {
  // Add properties as needed
}
