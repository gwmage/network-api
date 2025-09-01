```typescript
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Profile } from '../../profile/entities/profile.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  phone_number: string; // Added phone_number field

  @OneToOne(() => Profile, (profile) => profile.user)
  @JoinColumn()
  profile: Profile;

  @Column({ type: 'jsonb', nullable: true })
  notificationPreferences: { push: boolean; email: boolean };
}

```