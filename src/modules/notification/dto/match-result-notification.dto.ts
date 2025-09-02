```typescript
import { IsDateString, IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class MatchResultNotificationDto {
  @IsNotEmpty()
  @IsUUID()
  matchId: string;

  @IsNotEmpty()
  @IsString()
  matchTitle: string;

  @IsNotEmpty()
  @IsDateString()
  matchDate: Date;

  @IsNotEmpty()
  @IsString()
  matchLocation: string;

  @IsNotEmpty()
  @IsNumber()
  homeTeamScore: number;

  @IsNotEmpty()
  @IsNumber()
  awayTeamScore: number;

  @IsNotEmpty()
  @IsString()
  homeTeamName: string;

  @IsNotEmpty()
  @IsString()
  awayTeamName: string;
}
```