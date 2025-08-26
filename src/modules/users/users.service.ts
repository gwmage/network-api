```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserQueryParams } from './dto/user-query-params.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(query: UserQueryParams): Promise<{ users: User[]; total: number }> {
    const { page = 1, limit = 10, search, sort } = query;
    const skip = (page - 1) * limit;

    const qb = this.userRepository.createQueryBuilder('user');

    if (search) {
      qb.where('user.username LIKE :search', { search: `%${search}%` });
    }

    if (sort) {
      const [field, order] = sort.split(':');
      qb.orderBy(`user.${field}`, order.toUpperCase() as 'ASC' | 'DESC');
    }

    const [users, total] = await qb
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return { users, total };
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, updateUserDto); // Update the user object
    return this.userRepository.save(user);

  }

  async remove(id: number): Promise<void> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.remove(user);
  }

  async getActivityHistory(id: number): Promise<any[]> {
    // Placeholder for fetching activity history
    // This should be replaced with actual logic to retrieve user activity data
    // Example: Retrieve from a separate activity history table
    return [];
  }
}

```