import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('signup')
  async signUp(@Body() signupDto: SignupDto) {
    const user = await this.authService.signUp(signupDto);
    return {
      message: 'User registered successfully',
      user,
    };
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    // Initiates the Google OAuth flow
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: { user: User }, @Res() res: Response) {
    const user = req.user;
    const token = this.jwtService.sign({ sub: user.id, email: user.email });
    res.redirect(`http://localhost:3000/login/success?token=${token}`);
  }

  @Get('kakao')
  @UseGuards(AuthGuard('kakao'))
  async kakaoAuth(@Req() req) {
    // Initiates the Kakao OAuth flow
  }

  @Get('kakao/callback')
  @UseGuards(AuthGuard('kakao'))
  async kakaoAuthRedirect(@Req() req: { user: User }, @Res() res: Response) {
    const user = req.user;
    const token = this.jwtService.sign({ sub: user.id, email: user.email });
    res.redirect(`http://localhost:3000/login/success?token=${token}`);
  }
}