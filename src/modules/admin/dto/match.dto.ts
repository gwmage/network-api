```typescript
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class MatchDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @ApiProperty({ type: 'number', isArray: true })
  @IsArray()
  @IsNumber({}, { each: true })
  participants: number[]; // Array of user IDs

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;


  @ApiProperty()
  @IsString()
  @IsOptional()
  location?: string;
}


export class CreateMatchDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @ApiProperty({ type: 'number', isArray: true })
  @IsArray()
  @IsNumber({}, { each: true })
  @IsNotEmpty()
  participants: number[];

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  location?: string;
}

export class UpdateMatchDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  date?: Date;

  @ApiProperty({ required: false, type: 'number', isArray: true })
  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  participants?: number[];

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  location?: string;
}
```