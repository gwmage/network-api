```typescript
import { User } from 'src/modules/auth/entities/user.entity';
import { Comment } from 'src/modules/community/comment/entities/comment.entity';
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

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.notifications)
  recipient: User; // Renamed for clarity

  @ManyToOne(() => Comment, (comment) => comment.notifications, {
    nullable: true, // Not all notifications are related to comments
  })
  comment: Comment;

  @Column({
    type: 'enum',
    enum: NotificationType,
    nullable: true, // Allow for other notification types without a specific type
  })
  type: NotificationType;

  @Column({ nullable: true }) // Allow for generic notifications without specific content
  content: string;

  @CreateDateColumn()
  timestamp: Date;
}

```