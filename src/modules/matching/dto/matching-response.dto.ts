import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { MatchingInfoDto } from './matching-info.dto';

export class MatchingResponseDto {
  @ApiProperty({ type: [MatchingInfoDto] })
  @IsArray()
  groups: MatchingInfoDto[];
}