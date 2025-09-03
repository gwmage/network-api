"import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class UserMatchingInputDto {
  @IsNotEmpty()
  @IsString()
  region: string;

  @IsArray()
  @IsString({ each: true })
  preferences: string[];

  @IsArray()
  @IsString({ each: true })
  interests: string[];
}"