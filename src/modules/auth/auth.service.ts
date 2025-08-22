import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { AdminLoginDto } from './dto/admin-login.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUsersQueryDto } from './dto/find-users-query.dto';
import { UsersService } from '../users/users.service'; // Import UsersService

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
    private usersService: UsersService, // Inject UsersService
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<void> {
    return this.usersRepository.createUser(createUserDto);
  }

  async signIn(
    loginUserDto: LoginUserDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = loginUserDto;
    const user = await this.usersRepository.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { username };
      const accessToken = await this.jwtService.signAsync(payload);
      return { accessToken };
    }
    throw new UnauthorizedException('Please check your login credentials');
  }

  async adminSignIn(adminLoginDto: AdminLoginDto): Promise<{ accessToken: string }> {
      const { adminId, adminPassword } = adminLoginDto;
      // Replace with your admin authentication logic.
      // Example using environment variables:
      if (adminId === process.env.ADMIN_ID && adminPassword === process.env.ADMIN_PASSWORD) {
        const payload = { adminId };
        const accessToken = await this.jwtService.signAsync(payload);
        return { accessToken };
      }
      throw new UnauthorizedException('Invalid admin credentials');
    }

  async findAll(query: FindUsersQueryDto) {
    return this.usersService.findAll(query);
  }
  async findOne(id: number) {
    return this.usersService.findOne(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  async remove(id: number) {
    return this.usersService.remove(id);
  }

}
