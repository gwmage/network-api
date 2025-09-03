import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../auth/entities/user.entity';

enum DeliveryMethod {
  PUSH = 'PUSH',
  EMAIL = 'EMAIL',
}

enum DeliveryStatus {
  DELIVERED = 'DELIVERED',
  FAILED = 'FAILED',
}

@Entity()
export class NotificationDeliveryStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  notificationId: string; // Or a relation to a Notification entity if you have one

  @ManyToOne(() => User, (user) => user.notificationDeliveryStatuses)
  user: User;

  @Column({ type: 'enum', enum: DeliveryMethod })
  deliveryMethod: DeliveryMethod;

  @Column({ type: 'enum', enum: DeliveryStatus })
  status: DeliveryStatus;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;
}