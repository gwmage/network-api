import { IsArray, IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class UserDataDto {
  id: number;
  email: string;
  name: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;

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