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
  phone_number: string;

  @OneToOne(() => Profile, (profile) => profile.user)
  @JoinColumn()
  profile: Profile;

  @Column({ type: 'jsonb', nullable: true })
  notificationPreferences: { push: boolean; email: boolean };

  @Column({ type: 'jsonb', nullable: true })
  location: {
    latitude: number;
    longitude: number;
    description: string; //e.g., city, state
  };

  @Column({ type: 'jsonb', nullable: true })
  preferences: { [key: string]: any };

  @Column({ type: 'jsonb', nullable: true })
  interests: string[];

  @Column({ type: 'jsonb', nullable: true })
  weights: { [key: string]: number };
}

```