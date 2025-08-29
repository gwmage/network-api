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