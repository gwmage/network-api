```typescript
import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { IsOptional, IsString, IsArray, IsNumber } from 'class-validator';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsNumber({}, { each: true })
  categoryIds?: number[];

  @IsOptional()
  @IsString({ each: true })
  categoryNames?: string[];

  @IsOptional()
  @IsNumber({}, { each: true })
  tagIds?: number[];

  @IsOptional()
  @IsString({ each: true })
  tagNames?: string[];
}

```