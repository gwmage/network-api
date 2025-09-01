```typescript
import { Body, Controller, Post, HttpStatus, HttpException, ConflictException, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    // ... (existing register method code)
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('/password-recovery')
  async passwordRecovery(@Body() email: string) {
    return this.authService.passwordRecovery(email);
  }
}

```