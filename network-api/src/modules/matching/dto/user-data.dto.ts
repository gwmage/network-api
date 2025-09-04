import { IsArray, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UserDataDto {
  @IsNotEmpty()
  @IsString()
  region: string;

  @IsArray()
  @IsString({ each: true })
  preferences: string[];

  @IsArray()
  @IsString({ each: true })
  interests: string[];
}