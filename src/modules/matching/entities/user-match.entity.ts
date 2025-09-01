```typescript
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, Index } from 'typeorm';
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

  @Column({ type: 'float', nullable: true })
  matchingScore: number;

  @Column({ nullable: true })
  groupId: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  matchedAt: Date;

  @Column({ default: true })
  isActive: boolean;

  @Column('text', { array: true, nullable: true })
  @Index() // Indexing for faster filtering
  regions: string[];

  @Column('text', { array: true, nullable: true })
  @Index() // Indexing for faster filtering
  interests: string[];
}
```