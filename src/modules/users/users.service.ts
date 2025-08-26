```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUsersQueryDto } from './dto/find-users-query.dto';
import { Like } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async findAll(findUsersQueryDto: FindUsersQueryDto) {
    const { limit, offset, region, interests } = findUsersQueryDto;
    const query = this.userRepository.createQueryBuilder('user');

    if (region && region.length > 0) {
      query.andWhere(region.map(r => `user.region LIKE :region${r.replace(/[^a-zA-Z0-9]/g, '')}`),
        region.reduce((acc, r) => {
          acc[`region${r.replace(/[^a-zA-Z0-9]/g, '')}`] = `%${r}%`;
          return acc;
        }, {}));

    }

    if (interests && interests.length > 0) {
      interests.forEach((interest) => {
          query.andWhere(`user.interests::jsonb @> :interest${interest.replace(/[^a-zA-Z0-9]/g, '')}`, { [`interest${interest.replace(/[^a-zA-Z0-9]/g, '')}`]: `["${interest}"]` });
      });      
    }

    const [users, count] = await query
      .take(limit)
      .skip(offset)
      .getManyAndCount();


    return { users, count };
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
```