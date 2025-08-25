```typescript
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { AdminLoginDto } from './dto/admin-login.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUsersQueryDto } from './dto/find-users-query.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<void> {
    return this.usersRepository.createUser(createUserDto);
  }

  async signIn(loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
    const { username, password } = loginUserDto;
    const user = await this.usersRepository.findOne({ where: { username } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { username, isAdmin: user.isAdmin };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }

  async adminSignIn(adminLoginDto: AdminLoginDto): Promise<{ accessToken: string }> {
    const { username, password } = adminLoginDto;
    const user = await this.usersRepository.findOne({ where: { username, isAdmin: true } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { username, isAdmin: true }; // Ensure isAdmin is true in the payload
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your admin login credentials');
    }
  }

  async getAllUsers(findUsersQueryDto: FindUsersQueryDto) {
    return this.usersRepository.findUsers(findUsersQueryDto);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.updateUser(id, updateUserDto);
  }
}

```