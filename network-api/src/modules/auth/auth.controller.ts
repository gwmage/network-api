import { Body, Controller, HttpException, HttpStatus, Logger, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<{ message: string }> {
    try {
      const result = await this.authService.register(registerDto);
      return result;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      this.logger.error(`Failed to register user: ${error.message}`);
      throw new HttpException('Failed to register user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ accessToken: string, user: Partial<any> }> {
      return this.authService.login(loginDto);
  }


}