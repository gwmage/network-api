{"import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/auth/entities/user.entity';
import { CommunityModule } from './modules/community/community.module';
import { ApplicationModule } from './modules/application/application.module';
import { Community } from './modules/community/entities/community.entity';
import { Post } from './modules/community/entities/post.entity';
import { Comment } from './modules/community/entities/comment.entity';
import { MatchingModule } from './modules/matching/matching.module'; // Import MatchingModule
import { MatchingGroup } from './modules/matching/entities/matching-group.entity';
import { MatchExplanation } from './modules/matching/entities/match-explanation.entity';
import { Application } from './modules/application/entities/application.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User, Community, Post, Comment, MatchingGroup, MatchExplanation, Application],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    CommunityModule,
    ApplicationModule,
    MatchingModule, // Add MatchingModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}