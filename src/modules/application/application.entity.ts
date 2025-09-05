import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../user/entities/user.entity';

@Entity()
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  status: string;

  @CreateDateColumn()
  applicationDate: Date;

  @ManyToOne(() => User, (user) => user.applications)
  user: User;

  @Column()
  userId: number;


}