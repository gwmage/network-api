import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../auth/entities/user.entity';

@Entity()
export class UserNotificationPreferences {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.notificationPreferences)
  user: User;

  @Column({ default: true })
  pushNotificationEnabled: boolean;

  @Column({ default: false })
  emailNotificationEnabled: boolean;
}