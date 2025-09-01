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
import { User } from '../../auth/entities/user.entity';
import { Post } from './post.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;

  @Column({ type: 'text' })
  text: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  parentCommentId: number;

  @OneToMany(() => Comment, (comment) => comment.parentComment)
  replies: Comment[];

  @ManyToOne(() => Comment, (comment) => comment.replies)
  parentComment: Comment;

  @Column({ nullable: true })
  itemId: number;
}

```