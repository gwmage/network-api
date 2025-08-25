```typescript
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../../auth/entities/user.entity'; // Assuming User entity is in the auth module

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  profilePictureUrl: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  selfIntroduction: string;

  @Column({ type: 'text', array: true, nullable: true })
  areasOfInterest: string[];

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
```