```typescript
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsDate, IsUrl, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class ProfileDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsNumber()
  userId: number; 

  @ApiProperty({ description: 'Profile picture URL' })
  @IsUrl()
  @IsOptional()
  profilePicture?: string;

  @ApiProperty({ description: 'User\'s name' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Self-introduction' })
  @IsString()
  @IsOptional()
  selfIntroduction?: string;

  @ApiProperty({ description: 'Areas of interest', type: [String] })
  @IsArray()
  @IsOptional()
  interests?: string[];

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  createdAt?: Date;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  updatedAt?: Date;
}
```