```typescript
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Match } from '../../matches/entities/match.entity';

@Entity()
export class UserMatch {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userMatches)
  user: User;

  @ManyToOne(() => Match, (match) => match.userMatches)
  match: Match;

  @Column({ default: true })
  isActive: boolean;

  // Add other fields as needed, e.g.,
  // @Column()
  // matchingScore: number; 
}
```
