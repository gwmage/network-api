import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from 'typeorm';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, IsArray, IsOptional } from 'class-validator';
import { Application } from "src/modules/application/application.entity";

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
  password: string;


  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column({ nullable: true })
  @IsPhoneNumber('KR')
  phoneNumber: string;

  @Column({ nullable: true })
  @IsString()
  location: string;

  @Column({ nullable: true })
  @IsString()
  preferences: string;

  @Column('text', { array: true, nullable: true })
  @IsArray()
  @IsOptional()
  interests: string[];

  @OneToMany(() => Application, (application) => application.user)
  applications: Application[];

}