```typescript
import { Body, Controller, Post, HttpCode, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AdminLoginDto } from './dto/admin-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<{ access_token: string }> {
    try {
      const jwt = await this.authService.login(loginDto);
      return jwt;
    } catch (error) {
      throw new UnauthorizedException({ message: 'Invalid credentials' });
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('/admin/login')
  async adminLogin(@Body() adminLoginDto: AdminLoginDto): Promise<{ access_token: string }> {
    try {
      const jwt = await this.authService.adminLogin(adminLoginDto);
      return jwt;
    } catch (error) {
      throw new UnauthorizedException({ message: 'Invalid admin credentials' });
    }
  }
}
```