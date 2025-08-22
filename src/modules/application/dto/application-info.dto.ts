import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

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
  @IsOptional()
  @IsString()
  createdAt?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  updatedAt?: string;
}

export class GetApplicationInfoListRequestDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  page?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  limit?: number;
}