```typescript
import { User } from 'src/modules/auth/entities/user.entity';
import { Comment } from 'src/modules/community/entities/comment.entity'; // updated path
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum NotificationType {
  COMMENT = 'comment',
  // Add other notification types as needed
}

export enum NotificationDeliveryStatus {
  PENDING = 'pending',
  DELIVERED = 'delivered',
  READ = 'read',
  FAILED = 'failed',
}

export enum NotificationStatus {
  SENT = 'sent',
  FAILED = 'failed',
}


@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.notifications)
  recipient: User;

  @ManyToOne(() => Comment, (comment) => comment.notifications)
  comment: Comment;


  @Column({
    type: 'enum',
    enum: NotificationType,
    nullable: true,
  })
  type: NotificationType;


  @Column({ nullable: true })
  content: string;

  @CreateDateColumn()
  timestamp: Date;

  @Column({
    type: 'enum',
    enum: NotificationStatus,
    default: NotificationStatus.SENT,
  })
  status: NotificationStatus;

  @Column({
    type: 'enum',
    enum: NotificationDeliveryStatus,
    default: NotificationDeliveryStatus.PENDING,
  })
  deliveryStatus: NotificationDeliveryStatus;

  @Column({ nullable: true })
  postId: string;

}

```