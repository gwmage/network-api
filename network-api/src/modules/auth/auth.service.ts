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

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private userRepository: UserRepository, private jwtService: JwtService, private configService: ConfigService, private mailerService: MailerService) {}

  async register(registerDto: RegisterDto): Promise<{ message: string }> {
    const { email, password, name, phoneNumber } = registerDto;

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new HttpException('Email already exists', HttpStatus.CONFLICT);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.userRepository.create({
      email,
      password: hashedPassword,
      name,
      phoneNumber,
    });

    await this.userRepository.save(newUser);

    return { message: 'Registration successful' };
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

    try{
        await this.mailerService.sendMail({
          from: this.configService.get<string>('MAIL_FROM'),
          to: user.email,
          subject: 'Password Reset Request',
          text: `You requested a password reset. Please use this token to reset your password: ${resetToken}`,
          html: `<p>You requested a password reset. Please use this token to reset your password: ${resetToken}</p>`,
        });
    } catch (error) {
        this.logger.error(`Failed to send password reset email: ${error.message}`);
        throw new HttpException('Failed to send reset email', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}