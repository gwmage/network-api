```typescript
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { UserDto } from '../../user/dto/user.dto';

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

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString({ each: true })
  tags?: string[];

  @IsNotEmpty()
  author: UserDto;
}
```