```typescript
import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsNumber()
  authorId: number;

  @IsOptional()
  @IsNumber()
  parentCommentId?: number;
}
```