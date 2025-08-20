```typescript
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { email, password, ...otherData } = createUserDto;

    const existingUser = await this.usersRepository.findOneBy({ email });
    if (existingUser) {
      throw new Error('Email already exists.'); // Or a custom exception
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const newUser = await this.usersRepository.save({
        email,
        password: hashedPassword,
        ...otherData,
      });
      return newUser;
    } catch (error) {
      // Handle database errors appropriately, e.g., log and rethrow
      throw new Error('Failed to register user.');
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.usersRepository.findOneBy({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const payload = { email: user.email, sub: user.id }; // sub is usually the user ID
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}

```