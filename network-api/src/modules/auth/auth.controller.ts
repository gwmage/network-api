"import { Body, Controller, Post, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { PasswordRecoveryDto } from './dto/password-recovery.dto';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    try {
      const registrationResult = await this.authService.register(registerDto);
      return { statusCode: HttpStatus.CREATED, message: 'User registered successfully', data: registrationResult }; 
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        this.logger.error(`Error in registration: ${error}`);
        throw new HttpException('Registration failed', HttpStatus.INTERNAL_SERVER_ERROR);
      }
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
        throw new HttpException('Login failed', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  @Post('password-recovery')
  async initiatePasswordRecovery(@Body() passwordRecoveryDto: PasswordRecoveryDto): Promise<void> {
    try {
      return await this.authService.initiatePasswordRecovery(passwordRecoveryDto.email);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException('Password recovery initiation failed', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }    
  }
}"