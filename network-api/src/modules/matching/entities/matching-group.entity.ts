import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, Index } from 'typeorm';
import { User } from '../../auth/entities/user.entity';

@Entity()
export class MatchingGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  groupId: string;

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}

---[END_OF_FILES]---