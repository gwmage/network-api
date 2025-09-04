import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { User } from '../../auth/entities/user.entity';

@Entity()
export class MatchingGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  groupId: string;

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}