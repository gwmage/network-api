```typescript
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString({ each: true })
  tags?: string[];

  @IsNotEmpty() // Ensure author information is provided
  @IsString()
  authorId: string; // Assuming author is identified by ID
}
```