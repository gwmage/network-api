import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class MatchingRequestDto {
  @ApiProperty({
    description: 'User ID for matching',
    example: 1,
  })
  @IsNumber()
  userId: number;

  @ApiProperty({
    description: 'Optional list of user IDs to exclude from matching',
    example: [2, 3],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  excludeUserIds?: number[];

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