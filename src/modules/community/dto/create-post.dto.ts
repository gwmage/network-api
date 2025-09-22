```typescript
import { IsNotEmpty, IsString, IsOptional, IsArray, IsNumber } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  categoryIds?: number[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  categoryNames?: string[];

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  tagIds?: number[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tagNames?: string[];
}

```