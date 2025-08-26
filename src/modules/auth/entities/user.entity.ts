```typescript
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Profile } from '../../profile/entities/profile.entity';
import { Point } from 'geojson';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password?: string;

  @Column({ nullable: true })
  refreshToken?: string;

  @OneToOne(() => Profile, { cascade: true, eager: true })
  @JoinColumn()
  profile: Profile;

  @Column({ type: 'geography', spatialFeatureType: 'Point', srid: 4326, nullable: true })
  location: Point;

  @Column({ type: 'jsonb', nullable: true })
  preferences: any;

  @Column({ type: 'jsonb', nullable: true })
  interests: any;

  @Column({ nullable: true })
  region: string;

  @CreateDateColumn({ nullable: true })
  lastLogin: Date;

  @Column({ type: 'jsonb', array: true, default: [] })
  activityHistory: { timestamp: Date; action: string; data?: any }[];
}

```