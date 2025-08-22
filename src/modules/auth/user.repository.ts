```typescript
import { Injectable } from '@nestjs/common';
import { Repository, Like, FindOptionsWhere } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindManyOptions, ILike } from 'typeorm';


@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(userRepository.target, userRepository.manager, userRepository.queryRunner);
  }

  async findUsers(
    page: number,
    limit: number,
    search: string,
    sort: string,
  ): Promise<[User[], number]> {
    const take = limit;
    const skip = (page - 1) * limit;

    const whereClause: FindOptionsWhere<User> = {};

    if (search) {
      whereClause.username = ILike(`%${search}%`); // Partial matching for username
      // Add other fields for searching if needed (e.g., email, first_name, etc.)
    }

    const query = this.createQueryBuilder('user') // Explicitly specify alias for sorting
      .where(whereClause);

    if (sort) {
      const [sortBy, sortOrder] = sort.split(':');
      query.orderBy(`user.${sortBy}`, sortOrder.toUpperCase() as 'ASC' | 'DESC'); // Use alias here
    }

    return query.take(take).skip(skip).getManyAndCount();

  }

  async findUserById(id: number): Promise<User | null> {
    return this.findOne({ where: { id } });
  }


  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    await this.update(id, updateUserDto);
    return this.findOne({ where: { id } });
  }

  async deleteUser(id: number): Promise<void> {
    await this.delete(id);
  }

  async getUserActivity(id: number): Promise<any> { // Replace 'any' with the actual type of user activity
    // Implement logic to fetch user activity based on user ID
    // This might involve querying related tables or other data sources
    return null; // Placeholder
  }

}
```