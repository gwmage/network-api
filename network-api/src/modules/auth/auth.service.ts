"import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import {ConfigService} from "@nestjs/config";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private userRepository: UserRepository, private jwtService: JwtService, private configService: ConfigService) {}

  async register(registerDto: RegisterDto) {
    // ... (Existing registration logic)
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string; user: Partial<User> }> {
    const { email, password } = loginDto;
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const payload = { id: user.id, name: user.name, email: user.email };
    const accessToken = this.jwtService.sign(payload, {secret: this.configService.get<string>('JWT_SECRET'), expiresIn: '1d'});

    return { accessToken, user: payload };
  }

  async initiatePasswordRecovery(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new HttpException('Email not found', HttpStatus.NOT_FOUND);
    }

    const resetToken = uuidv4();
    const resetTokenExpiration = new Date();
    resetTokenExpiration.setHours(resetTokenExpiration.getHours() + 24); // Token expires in 24 hours

    await this.userRepository.updateResetToken(user.id, resetToken, resetTokenExpiration);
    const mailOptions = {
      from: this.configService.get<string>('MAIL_FROM'),
      to: user.email,
      subject: 'Password Reset Request',
      text: `You requested a password reset. Please use this token to reset your password: ${resetToken}`,
      html: `<p>You requested a password reset. Please use this token to reset your password: ${resetToken}</p>`,
    };

  }
}