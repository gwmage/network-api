```typescript
import { Body, Controller, Post, HttpStatus, HttpException, ConflictException, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    try {
      await this.authService.register(registerDto);
      return {
        status: 'success',
        message: 'User registered successfully',
      };
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException({
          status: 'error',
          message: 'Email already exists',
          errors: { email: 'This email is already registered.' },
        });
      } else if (error.message.includes('Validation failed')) {
        throw new BadRequestException({
          status: 'error',
          message: error.message,
          errors: error.errors || {},
        });
      } else {
        throw new HttpException(
          {
            status: 'error',
            message: 'An error occurred during registration',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
```