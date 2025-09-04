import { IsArray, IsNumber, IsOptional } from 'class-validator';

export class UserMatchingInputDto {
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  userIds?: number[];
}