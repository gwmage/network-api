import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum NotificationMethod {
  EMAIL = 'email',
  PUSH = 'push',
}

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @Column({ type: 'enum', enum: NotificationMethod, default: NotificationMethod.EMAIL })
  method: NotificationMethod;

  @ManyToOne(() => User, (user) => user.notifications)
  user: User;

  // Add other relevant fields as needed
}