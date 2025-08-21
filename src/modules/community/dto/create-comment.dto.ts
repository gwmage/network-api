```typescript
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  postId: string;

  @IsOptional()
  @IsString()
  parentId?: string;
}
```