```typescript
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsOptional()
  @IsString()
  parentCommentId?: string;

  @IsNotEmpty()
  @IsString()
  itemId: string;
}

```