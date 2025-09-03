"import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../../auth/entities/user.entity';

@Entity()
export class MatchingGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];

  // Add other relevant group info as needed
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}"