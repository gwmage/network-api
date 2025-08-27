```typescript
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { NotificationType } from './notification.entity';
import { User } from '../../auth/entities/user.entity';

export enum NotificationDeliveryStatus {
  DELIVERED = 'delivered',
  READ = 'read',
  UNREAD = 'unread',
  FAILED = 'failed',
}

@Entity()
export class NotificationDeliveryStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  recipient: User;

  @Column({
    type: 'enum',
    enum: NotificationType,
  })
  notificationType: NotificationType;

  @Column({
    type: 'enum',
    enum: NotificationDeliveryStatus,
  })
  status: NotificationDeliveryStatus;

  @CreateDateColumn()
  timestamp: Date;
}

```