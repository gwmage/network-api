```typescript
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FindUsersQueryDto } from './dto/find-users-query.dto';

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
      // Handle user not found error, e.g., throw NotFoundException
      return null; 
    }
    Object.assign(user, updateUserDto); // Update user properties
    return this.usersRepository.save(user);
  }


  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    if (!user) {
      // Handle user not found error, e.g., throw NotFoundException
      return;
    }
     await this.usersRepository.remove(user);
  }

   async findUsers(findUsersQueryDto: FindUsersQueryDto) {
     // Implement your query logic here using findUsersQueryDto
     // Example:
    const queryBuilder = this.usersRepository.createQueryBuilder('user');
    if(findUsersQueryDto.username) {
        queryBuilder.andWhere('user.username LIKE :username', {username:`%${findUsersQueryDto.username}%`});
    }
    // ... add other filter conditions
    return queryBuilder.getMany();
  }
}
```