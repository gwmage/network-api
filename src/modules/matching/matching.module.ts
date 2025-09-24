import { Module } from '@nestjs/common';
import { MatchingService } from './matching.service';
import { MatchingController } from './matching.controller';
console.log('Current working directory:', process.cwd());
console.log('__dirname:', __dirname);
console.log('Importing from:', '../../users/users.module');
import { UsersModule } from '../../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [MatchingController],
  providers: [MatchingService],
})
export class MatchingModule {}
