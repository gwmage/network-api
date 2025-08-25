```typescript
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post, // Import Post
  Put,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UsersService } from '../user/user.service';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { AuthService } from './auth.service'; // Import AuthService
import { AdminLoginDto } from './dto/admin-login.dto'; // Import DTO


@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService, // Inject AuthService
  ) {}

  // ... other methods

  @Post('admin/login') // New admin login endpoint
  @HttpCode(HttpStatus.OK) // Explicitly set status code to 200
  async adminLogin(@Body() adminLoginDto: AdminLoginDto): Promise<{ accessToken: string }> {
    return this.authService.adminLogin(adminLoginDto);
  }
}

```