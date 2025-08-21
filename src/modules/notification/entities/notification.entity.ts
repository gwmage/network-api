```typescript
import { User } from 'src/modules/auth/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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
  user: User;

  @Column({
    type: 'enum',
    enum: NotificationType,
    nullable: true, // Allow for other notification types without a specific type
  })
  type: NotificationType;

  @Column({ nullable: true }) // Allow for generic notifications without a target
  targetId: number;

  @Column()
  message: string;

  @Column({ default: 'push' })
  deliveryMethod: 'push' | 'email' | 'sms'; // Add other methods as needed

  @Column({ default: false })
  readStatus: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

```