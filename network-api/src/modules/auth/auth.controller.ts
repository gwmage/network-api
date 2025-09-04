import { Body, Controller, Post, HttpException, HttpStatus, Logger, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { PasswordRecoveryDto } from './dto/password-recovery.dto';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private authService: AuthService) {}

  @Post('register')
  @UsePipes(ValidationPipe)
  async register(@Body() registerDto: RegisterDto): Promise<{ message: string }> {
    try {
      return await this.authService.register(registerDto);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      this.logger.error('Registration failed', error);
      throw new HttpException('Registration failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      return await this.authService.login(loginDto);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        this.logger.error(`Login failed: ${error.message}`);
        throw new HttpException('Login failed', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  @Post('forgot-password')
  async initiatePasswordRecovery(@Body() passwordRecoveryDto: PasswordRecoveryDto): Promise<{message: string}> {
      try {
          await this.authService.initiatePasswordRecovery(passwordRecoveryDto.email);
          return { message: 'Password reset email sent' };
      } catch (error) {
          if (error instanceof HttpException) {
              throw error; // Re-throw HttpExceptions to preserve status code
          }
          this.logger.error('Failed to initiate password recovery', error);
          throw new HttpException('Failed to initiate password recovery', HttpStatus.INTERNAL_SERVER_ERROR);
      }
  }
}