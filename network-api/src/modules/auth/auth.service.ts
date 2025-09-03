"import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private userRepository: UserRepository) {}

  async register(registerDto: RegisterDto) {
    const { email, password, name, phoneNumber } = registerDto;

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new HttpException('Email already exists', HttpStatus.CONFLICT);
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
      return { success: true, userId: newUser.id };
    } catch (error) {
      this.logger.error(`Error registering user: ${error}`);
      throw new HttpException('Registration failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async login(loginDto: LoginDto): Promise<Partial<User>> {
    const { email, password } = loginDto;
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return { id: user.id, name: user.name, email: user.email };
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

    // TODO: Send password reset email with the token to the user (using a NotificationService or similar)
    this.logger.log(`Password recovery initiated for user ${user.email} with token ${resetToken}`);
  }
}"