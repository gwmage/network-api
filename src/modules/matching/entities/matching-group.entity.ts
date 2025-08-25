```typescript
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { User } from '../../users/user.entity';
import { MatchingCriteria } from './matching-criteria.entity';

@Entity()
export class MatchingGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float', nullable: true })
  matchingScore: number;

  @ManyToMany(() => User)
  @JoinTable()
  participants: User[];

  @OneToMany(() => MatchingCriteria, (criteria) => criteria.group)
  criteria: MatchingCriteria[];
}

```