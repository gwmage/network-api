```typescript
import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { NotificationSettings } from '../notification/notification-settings.interface';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findByEmail(email: string): Promise<User | undefined> {
    return this.findOne({ where: { email } });
  }

  async existsByEmail(email: string): Promise<boolean> {
    const count = await this.count({ where: { email } });
    return count > 0;
  }

  async saveNotificationSettings(userId: number, notificationSettings: NotificationSettings): Promise<User> {
    const user = await this.findOne(userId);
    if (!user) {
      throw new Error('User not found');
    }
    user.notificationSettings = notificationSettings;
    return this.save(user);
  }

  async getNotificationSettings(userId: number): Promise<NotificationSettings | undefined> {
    const user = await this.findOne(userId);
    return user?.notificationSettings;
  }
}

```