```typescript
import { User } from 'src/modules/auth/entities/user.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  // Add other admin-specific properties if needed. For example:
  // @Column({ nullable: true })
  // department: string;

  // @Column({ nullable: true })
  // role: string; 
}
```