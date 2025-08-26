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
  commentId: number;

  @Column({ type: 'text' })
  commentText: string;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @Column()
  userId: number;

  @CreateDateColumn()
  createdAt: Date;


  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;

  @Column()
  postId: number;

  @OneToMany(() => Comment, (comment) => comment.parentComment)
  children: Comment[];

  @ManyToOne(() => Comment, (comment) => comment.children, {
    onDelete: 'CASCADE',
  })
  parentComment: Comment;

  @UpdateDateColumn()
  updatedAt: Date;
}

```