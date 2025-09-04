import { IsArray, IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class UserMatchingInputDto {
  @IsOptional()
  @IsNumber({}, { each: true })
  userIds?: number[];

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  region?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  preferences?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  interests?: string[];
}