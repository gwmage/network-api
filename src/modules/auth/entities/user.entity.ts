```typescript
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Profile } from '../../profile/entities/profile.entity';
import { Point } from 'geojson'; // Import necessary type

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

  @OneToOne(() => Profile, { cascade: true, eager: true})
  @JoinColumn()
  profile: Profile;

  @Column({ type: 'jsonb', nullable: true })
  preferences: any;

  @Column({ type: 'jsonb', nullable: true })
  interests: any;

  @Column({ type: 'geography', spatialFeatureType: 'Point', srid: 4326, nullable: true })
  location: Point;

  @Column({ nullable: true })
  region: string;
}

```
