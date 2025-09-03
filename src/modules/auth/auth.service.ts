import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async register(registerDto: RegisterDto) {

    await this.userRepository.checkEmailUniqueness(registerDto.email);

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const newUser = await this.userRepository.createUser({
      ...registerDto,
      password: hashedPassword,
    });

    return {
      status: 'success',
      message: 'User registered successfully',
      userId: newUser.id, 
    };
  }
}
