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
      const result = await this.authService.register(registerDto);
      if (result.status === 'success') {
        return {
          status: 'success',
          message: 'User registered successfully',
        };
      } else {
        if (result.message === 'Email already exists') {
          throw new ConflictException({
            status: 'error',
            message: 'Email already exists',
            errors: { email: 'This email is already registered.' },
          });
        } else {
          throw new BadRequestException({
            status: 'error',
            message: result.message,
            errors: result.errors || {}, 
          });
        }
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error; 
      } else {
        throw new HttpException(
          {
            status: 'error',
            message: 'An unexpected error occurred during registration.', 
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
```