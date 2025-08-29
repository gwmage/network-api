```typescript
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
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