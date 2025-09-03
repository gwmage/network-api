import { EntityRepository, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ConflictException } from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findByEmail(email: string): Promise<User | undefined> {
    return this.findOne({ where: { email } });
  }

  async checkEmailUniqueness(email: string): Promise<void> {
    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
  }

  async createUser(user: User) {
      return this.save(user);
  }


}
