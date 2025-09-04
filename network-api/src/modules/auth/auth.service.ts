import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import {ConfigService} from "@nestjs/config";
import {MailerService} from "@nestjs-modules/mailer";
import { PasswordRecoveryDto } from './dto/password-recovery.dto';
import { addHours } from 'date-fns';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private userRepository: UserRepository, private jwtService: JwtService, private configService: ConfigService, private mailerService: MailerService) {}

  async register(registerDto: RegisterDto): Promise<{ message: string }> {
    // ... existing registration logic
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string, user: Partial<User> }> {
    const { email, password } = loginDto;

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken, user: { id: user.id, name: user.name, email: user.email } };
  }


  async initiatePasswordRecovery(passwordRecoveryDto: PasswordRecoveryDto): Promise<{ message: string }> {
    const { email } = passwordRecoveryDto;

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const resetToken = uuidv4();
    const resetTokenExpiration = addHours(new Date(), 1);

    try {
      await this.userRepository.updateResetToken(user.id, resetToken, resetTokenExpiration);

      await this.mailerService.sendMail({
        to: email,
        subject: 'Password Reset Request',
        html: `Click <a href="${this.configService.get<string>('CLIENT_URL')}/reset-password/${resetToken}">here</a> to reset your password.`,
      });

      return { message: 'Password reset email sent' };

    } catch (error) {
      this.logger.error('Failed to send password reset email:', error);
      throw new HttpException('Failed to send password reset email', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}