```typescript
import { Body, Controller, Post, HttpStatus, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      await this.authService.register(createUserDto);
      return {
        status: 'success',
        message: 'User registered successfully',
      };
    } catch (error) {
      if (error.code === '23505') {
        throw new HttpException(
          {
            status: 'error',
            message: 'Email already exists',
            errors: { email: 'This email is already registered.' },
          },
          HttpStatus.CONFLICT,
        );
      } else if (error.message.includes('Validation failed')) {
        throw new HttpException(
          {
            status: 'error',
            message: error.message,
            errors: error.errors || {},
          },
          HttpStatus.BAD_REQUEST,
        );

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