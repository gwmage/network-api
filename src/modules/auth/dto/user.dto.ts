```typescript
import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  data: any;

  @ApiProperty()
  notificationPreferences: {
    push: boolean;
    email: boolean;
  };
}
```