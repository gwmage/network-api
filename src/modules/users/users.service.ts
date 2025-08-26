```typescript
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FindUsersQueryDto } from './dto/find-users-query.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(newUser);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Update user properties, including notification settings
    Object.assign(user, updateUserDto);

    // Validate and handle notification settings update
    if (updateUserDto.notificationPreferences) {
      user.notificationPreferences = {
        ...user.notificationPreferences,
        ...updateUserDto.notificationPreferences,
      };
       // Perform validation if needed, e.g., check if push and email are booleans
      if(typeof user.notificationPreferences.push !== 'boolean' || typeof user.notificationPreferences.email !== 'boolean'){
          throw new Error("Invalid notification preferences. Push and email must be boolean values.")
      }
    }

    return this.usersRepository.save(user);
  }


  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
     await this.usersRepository.remove(user);
  }

   async findUsers(findUsersQueryDto: FindUsersQueryDto) {
    const queryBuilder = this.usersRepository.createQueryBuilder('user');
    if(findUsersQueryDto.username) {
        queryBuilder.andWhere('user.username LIKE :username', {username:`%${findUsersQueryDto.username}%`});
    }
    return queryBuilder.getMany();
  }
}

```