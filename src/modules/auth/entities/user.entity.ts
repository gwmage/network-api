```typescript
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Profile } from '../../profile/entities/profile.entity';
import { UserNotificationSettings } from './user-notification-settings.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  phone_number: string;


  @OneToOne(() => Profile, (profile) => profile.user)
  @JoinColumn()
  profile: Profile;

  @Column({ type: 'jsonb', nullable: true })
  notificationPreferences: { push: boolean; email: boolean };

  @OneToOne(() => UserNotificationSettings, (settings) => settings.user)
  @JoinColumn()
  notificationSettings: UserNotificationSettings;
}

```