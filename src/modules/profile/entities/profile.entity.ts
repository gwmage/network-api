```typescript
import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../../auth/entities/user.entity';

export enum ProfileVisibility {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column({ nullable: true })
  profilePicture: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  selfIntroduction: string;

  @Column({ nullable: true })
  areasOfInterest: string;

  @Column({
    type: 'enum',
    enum: ProfileVisibility,
    default: ProfileVisibility.PUBLIC,
  })
  visibility: ProfileVisibility;
}
```