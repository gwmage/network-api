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
import { User } from './user.entity';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    // ... (existing code)
  }

  async login(loginUserDto: LoginUserDto) {
    // ... (existing code)
  }


  async adminLogin(adminLoginDto: AdminLoginDto) {
    // ... (existing code)
  }

  async findAll(queryDto: FindUsersQueryDto, options: IPaginationOptions): Promise<Pagination<User>> {
    const qb = this.usersRepository.createQueryBuilder('user');

    if (queryDto.username) {
      qb.andWhere('user.username LIKE :username', { username: `%${queryDto.username}%` });
    }
    if (queryDto.email) {
      qb.andWhere('user.email LIKE :email', { email: `%${queryDto.email}%` });
    }


    if (queryDto.sortBy) {
        qb.orderBy(`user.${queryDto.sortBy}`, queryDto.sortOrder || 'ASC')
    }

    return paginate<User>(qb, options);
  }

  async findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error('User not found');
    }

    Object.assign(user, updateUserDto); // Update the user object with the new data

    return this.usersRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error('User not found');
    }

    await this.usersRepository.remove(user);
  }

}
```