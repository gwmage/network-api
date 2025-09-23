```typescript
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository, Like, In } from 'typeorm';
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

  async update(id: number, updateUserDto: UpdateUserDto, currentUser: User): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Authorization check: Only allow admins or the user themselves to update
    if (currentUser.role !== 'admin' && currentUser.id !== user.id) {
      throw new UnauthorizedException('You are not authorized to update this user.');
    }

    Object.assign(user, updateUserDto);

    if (updateUserDto.notificationPreferences) {
      // Check if user.notificationPreferences exists before spreading
      user.notificationPreferences = {
        ...(user.notificationPreferences || {}),
        ...updateUserDto.notificationPreferences,
      };
      // Ensure push and email are boolean
      user.notificationPreferences.push = !!user.notificationPreferences.push; // Coerce to boolean
      user.notificationPreferences.email = !!user.notificationPreferences.email; // Coerce to boolean
    }

    return this.usersRepository.save(user);
  }


  async remove(id: number, currentUser: User): Promise<void> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Authorization check: Only allow admins to delete users
    if (currentUser.role !== 'admin') {
      throw new UnauthorizedException('You are not authorized to delete users.');
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