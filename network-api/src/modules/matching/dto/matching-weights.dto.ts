import { IsNumber, Min } from 'class-validator';

export class MatchingWeightsDto {
  @IsNumber()
  @Min(0)
  region: number;

  @IsNumber()
  @Min(0)
  preferences: number;

  @IsNumber()
  @Min(0)
  interests: number;
}