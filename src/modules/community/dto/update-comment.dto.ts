```typescript
import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create-comment.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString({ each: true })
  tags?: string[];
}

```