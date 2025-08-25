```typescript
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../../users/user.entity';

@Entity()
export class MatchingGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float', nullable: true })
  matchingScore: number;

  @ManyToMany(() => User)
  @JoinTable()
  participants: User[];
}
```
