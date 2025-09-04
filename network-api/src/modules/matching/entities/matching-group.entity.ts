import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../../auth/entities/user.entity';

@Entity()
export class MatchingGroup {
  @PrimaryGeneratedColumn('uuid')
  groupId: string;

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];

  @Column({ nullable: true })
  notificationId: string;
}