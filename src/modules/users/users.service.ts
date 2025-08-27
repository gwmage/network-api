```typescript
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository, Like, In } from 'typeorm';
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

    Object.assign(user, updateUserDto);

    if (updateUserDto.notificationPreferences) {
      user.notificationPreferences = {
        ...user.notificationPreferences,
        ...updateUserDto.notificationPreferences,
      };
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
    const { regions, interests, page = 1, limit = 10 } = findUsersQueryDto;
    const queryBuilder = this.usersRepository.createQueryBuilder('user');

    if (regions) {
      queryBuilder.andWhere('user.region IN (:...regions)', { regions });
    }

    if (interests) {
      queryBuilder.andWhere('user.interests && ARRAY[:...interests]', { interests });
    }

    const [users, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      data: users,
      meta: {
        totalItems: total,
        itemCount: users.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      },
    };
  }
}

```