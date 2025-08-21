```typescript
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { Post } from './post.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.comments)
  author: User;

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;

  @Column({ type: 'int', nullable: true })
  parentCommentId: number | null;

  @OneToMany(() => Comment, (comment) => comment.parentComment)
  replies: Comment[];

  @ManyToOne(() => Comment, (comment) => comment.replies, { onDelete: 'CASCADE' })
  parentComment: Comment | null;
}

```