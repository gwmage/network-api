```typescript
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateNotificationDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  commentId: string;

  @IsNotEmpty()
  @IsString()
  postId: string;
}
```