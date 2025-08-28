```typescript
import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

@Entity()
@Unique(['email']) // Ensure email is unique
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;


  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column({ nullable: true }) // Phone number is optional
  @IsPhoneNumber('KR') // Validate phone number format for Korea
  phoneNumber: string;


}

```