```typescript
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity'; // Correct import path
import { Post } from './post.entity';
import { Notification } from '../../notification/entities/notification.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => User, (user) => user.comments)
  author: User;

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  parentCommentId: number;

  @OneToMany(() => Comment, (comment) => comment.parentComment)
  replies: Comment[];

  @ManyToOne(() => Comment, (comment) => comment.replies, { onDelete: 'CASCADE' })
  parentComment: Comment;

  @OneToMany(() => Notification, (notification) => notification.comment)
  notifications: Notification[];
}

```