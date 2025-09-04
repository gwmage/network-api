```typescript
import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create-comment.dto';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsNumber()
  parentCommentId?: number;
}

```
---[END_OF_FILES]---