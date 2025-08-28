```typescript
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, CreateDateColumn } from 'typeorm';
import { User } from '../../users/user.entity';
import { MatchingCriteria } from './matching-criteria.entity';

@Entity()
export class MatchingGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => User)
  @JoinTable()
  participants: User[];

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'text', nullable: true })
  matchingRationale: string;

  @Column({ type: 'float', nullable: true })
  matchingScore: number;

  @OneToMany(() => MatchingCriteria, (criteria) => criteria.group)
  criteria: MatchingCriteria[];
}

```
