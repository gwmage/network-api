```typescript
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Profile } from '../../profile/entities/profile.entity';
import { IsString, IsArray, IsOptional } from 'class-validator';

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

  @Column()
  @IsString()
  location: string;

  @Column({ type: 'text', array: true, nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  preferences: string[];

  @Column({ type: 'text', array: true, nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  interests: string[];
}

```