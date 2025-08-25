```typescript
import { IsNotEmpty, IsString, IsOptional, MinLength } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1, { message: 'Content must be at least 1 character long' })
  content: string;

  @IsNotEmpty()
  @IsString()
  postId: string;

  @IsOptional()
  @IsString()
  parentId?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString({ each: true })
  tags?: string[];
}
```