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
      whereClause.username = ILike(`%${search}%`); 
    }

    const query = this.createQueryBuilder('user')
      .where(whereClause);

    if (sort) {
      const [sortBy, sortOrder] = sort.split(':');
      query.orderBy(`user.${sortBy}`, sortOrder.toUpperCase() as 'ASC' | 'DESC');
    }

    return query.take(take).skip(skip).getManyAndCount();

  }

  async findUserById(id: number): Promise<User | null> {
    return this.findOne({ where: { id }, relations: ['profile'] });
  }

  async findUserForMatching(id: number): Promise<User | null> {
    return this.findOne({
      where: { id },
      relations: ['profile', 'profile.preferences', 'profile.interests'],
    });
  }


  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    await this.update(id, updateUserDto);
    return this.findOne({ where: { id } });
  }

  async deleteUser(id: number): Promise<void> {
    await this.delete(id);
  }

  async getUserActivity(id: number): Promise<any> {
    return null; 
  }

}
```