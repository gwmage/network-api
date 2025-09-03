```typescript
import { IsNotEmpty, IsString, IsOptional, IsNumber, IsUUID } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  @IsUUID()
  parentId?: string;

  @IsNotEmpty()
  @IsUUID()
  itemId: string;
}

```