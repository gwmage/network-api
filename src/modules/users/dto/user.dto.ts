```typescript
import { IsArray, IsOptional, IsString, IsNumber, IsBoolean } from 'class-validator';

export class MemberDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  region?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  interests?: string[];

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  // Add other properties as needed, e.g., profile picture URL, registration date, etc.
}

export class UpdateMemberDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  region?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  interests?: string[];

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

    // Add other updatable properties as needed
}


export class MemberActivityDto {
  @IsNumber()
  id: number;

  @IsString()
  activityType: string; // e.g., 'login', 'profile update', 'event registration'

  @IsString()
  timestamp: string; // Or Date

  // Add other relevant activity properties as needed.
}

export class PaginatedMembersDto {
  @IsArray()
  members: MemberDto[];

  @IsNumber()
  totalCount: number;
}

```