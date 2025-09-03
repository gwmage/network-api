"import { EntityRepository, Repository, UpdateResult } from 'typeorm';
import { User } from './entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findByEmail(email: string): Promise<User | undefined> {
    return this.findOne({ where: { email } });
  }

  async updateResetToken(userId: number, resetToken: string, resetTokenExpiration: Date): Promise<UpdateResult> {
    return this.update(userId, { resetToken, resetTokenExpiration });
  }
}"