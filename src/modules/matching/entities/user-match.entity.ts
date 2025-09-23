import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, Index } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class UserMatch {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userMatches)
  user: User;

  constructor() {}

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