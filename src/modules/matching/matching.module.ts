import { Module } from '@nestjs/common';
import { MatchingService } from './matching.service';
import { MatchingController } from './matching.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchExplanation } from './entities/match-explanation.entity';
import { UsersModule } from '../users/users.module';
import { User } from '../users/entities/user.entity';

console.log('Current working directory:', process.cwd());
console.log('__dirname:', __dirname);
console.log('Attempting to import MatchingService from:', require.resolve('./matching.service'));

@Module({
  imports: [TypeOrmModule.forFeature([MatchExplanation]), UsersModule, TypeOrmModule.forFeature([User])],
  controllers: [MatchingController],
  providers: [MatchingService],
  exports: [MatchingService],
})
export class MatchingModule {}
