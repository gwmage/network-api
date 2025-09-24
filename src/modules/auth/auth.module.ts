import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { AuthRepository } from './auth.repository'; 

@Module({
  imports: [
    UsersModule,
    JwtModule.register({}), // Placeholder, needs proper configuration
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, AuthRepository, {
    provide: 'UserRepository',
    useExisting: 'AuthRepository'
  }],
exports: [AuthService]
})
export class AuthModule {}
