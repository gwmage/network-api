```typescript
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export enum NotificationMethod {
  PUSH = 'push',
  EMAIL = 'email',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  contactNumber: string;

  @Column({ nullable: true })
  preferences: string;

  @Column({ nullable: true })
  interests: string;

  @Column({ nullable: true })
  region: string;

  @Column('enum', { array: true, enum: NotificationMethod, default: [] })
  notificationPreferences: NotificationMethod[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
```