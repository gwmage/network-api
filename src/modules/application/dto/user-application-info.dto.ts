```typescript
import { IsNotEmpty, IsString, IsOptional, IsNumber, IsArray, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserApplicationInfoDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  region: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  preferences?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  selfIntroduction: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  careerHistory?: {
    companyName: string;
    role: string;
    startDate: string;
    endDate: string;
  }[];
}
```