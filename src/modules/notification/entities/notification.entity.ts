import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { NotificationType } from '../dto/notification.dto';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: NotificationType, default: NotificationType.EMAIL })
  type: NotificationType;

  @Column({ type: 'uuid' })
  userId: string;

  @Column()
  title: string;

  @Column()
  message: string;

  @Column({ type: 'jsonb', nullable: true })
  data?: any;
}