```typescript
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from '../../auth/entities/user.entity';

export enum PreferredMethod {
  PUSH = 'push',
  EMAIL = 'email',
}

export enum NotificationDeliveryStatus {
  DELIVERED = 'delivered',
  FAILED = 'failed',
}

@Entity()
export class NotificationPreferences {
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

  @Column({ default: true })
  enabled: boolean;

  @Column({
    type: 'enum',
    enum: NotificationDeliveryStatus,
    default: NotificationDeliveryStatus.DELIVERED,
  })
  status: NotificationDeliveryStatus;

  @CreateDateColumn()
  timestamp: Date;


  @OneToOne(() => User, (user) => user.notificationPreferences, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}

```