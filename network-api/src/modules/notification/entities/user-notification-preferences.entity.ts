import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, Index } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { NotificationEvent } from '../dto/notification-event.enum';

@Entity()
export class UserNotificationPreferences {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.notificationPreferences)
  @Index()
  user: User;

  @Column({ default: true })
  pushNotificationEnabled: boolean;

  @Column({ default: false })
  emailNotificationEnabled: boolean;

  @Column('simple-array', { default: [] })
  notificationEvents: NotificationEvent[];

  @Column('simple-array', { default: [] })
  notificationMethods: string[];

  @Column({ type: 'time', nullable: true })
  notificationStartTime: string;

  @Column({ type: 'time', nullable: true })
  notificationEndTime: string;
}