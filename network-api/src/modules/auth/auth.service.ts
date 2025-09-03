"import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private userRepository: UserRepository) {}

  async register(registerDto: RegisterDto) {
    const { email, password, name, phoneNumber } = registerDto;

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const newUser = await this.userRepository.create({
        email,
        password: hashedPassword,
        name,
        phoneNumber,
      });

      await this.userRepository.save(newUser);
      this.logger.log(`New user registered: ${email}`);
      return { success: true };
    } catch (error) {
      this.logger.error(`Error registering user: ${error}`);
      throw new HttpException('Registration failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}"