```typescript
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { MatchingController } from '../matching/matching.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController, MatchingController], // Added MatchingController here
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

```
