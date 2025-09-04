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
    const { email, password, name, phoneNumber, address, city, state, zipCode } = registerDto;

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
      address,
      city,
      state,
      zipCode,
    });

    try {
      await this.userRepository.save(newUser);
    } catch (error) {
      this.logger.error(`Failed to register user: ${error.message}`);
      throw new HttpException('Failed to register user', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return { message: 'Registration successful' };
  }

  // ... other methods (login, initiatePasswordRecovery)
}