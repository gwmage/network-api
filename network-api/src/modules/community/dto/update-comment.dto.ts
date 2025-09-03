```typescript
import { IsNotEmpty, IsString, MaxLength, IsOptional } from 'class-validator';

export class UpdateCommentDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  content: string;

  @IsOptional()
  @IsString()
  parentId?: string;
}
```