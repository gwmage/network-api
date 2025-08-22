```typescript
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { Comment } from './comment.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => User, (user) => user.posts)
  author: User;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'simple-array', nullable: true })
  category: string[];

  @Column({ type: 'simple-array', nullable: true })
  tags: string[];

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @UpdateDateColumn()
  updatedAt: Date;
}

```