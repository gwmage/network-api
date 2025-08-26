```typescript
import { IsNotEmpty, IsString, IsOptional, IsUUID } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsUUID()
  postId: string;

  @IsOptional()
  @IsUUID()
  parentId?: string;

  @IsOptional()
  @IsUUID()
  parentCommentId?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString({ each: true })
  tags?: string[];
}

```