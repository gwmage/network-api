```typescript
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';


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

  @Column({ default: 0 })
  commentCount: number;

  @UpdateDateColumn()
  updatedAt: Date;
}

```