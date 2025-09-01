```typescript
import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
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

  async savePasswordResetToken(user: User, token: string): Promise<void> {
    user.passwordResetToken = token;
    await this.save(user);
  }

  async findByPasswordResetToken(token: string): Promise<User | undefined> {
    return this.findOne({ where: { passwordResetToken: token } });
  }

  async clearPasswordResetToken(user: User): Promise<void> {
    user.passwordResetToken = null;
    await this.save(user);
  }
}
```