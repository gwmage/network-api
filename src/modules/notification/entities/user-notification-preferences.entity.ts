```typescript
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../../auth/entities/user.entity';

export enum PreferredMethod {
  PUSH = 'push',
  EMAIL = 'email',
}

@Entity()
export class UserNotificationPreferences {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: PreferredMethod,
    default: PreferredMethod.PUSH,
  })
  preferredMethod: PreferredMethod;

  @Column({ default: true })
  push: boolean;

  @Column({ default: false })
  email: boolean;

  @OneToOne(() => User, (user) => user.notificationPreferences, { cascade: true })
  @JoinColumn()
  user: User;
}

```