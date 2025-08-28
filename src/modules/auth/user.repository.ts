```typescript
import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findByEmail(email: string): Promise<User | undefined> {
    return this.findOne({ where: { email } });
  }

  async existsByEmail(email: string): Promise<boolean> {
    const count = await this.count({ where: { email } });
    return count > 0;
  }

  async findUsersForMatching(): Promise<User[]> {
    // Implement your logic to retrieve users for matching here.
    // For example, to get all active users:
    return this.find({ where: { isActive: true } }); 
  }
}
```