import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserMatch } from '../../matching/entities/user-match.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => UserMatch, (userMatch) => userMatch.user)
  userMatches: UserMatch[];

  constructor() {
    console.log('User.userMatches type:', typeof this.userMatches);
    console.log('User.userMatches:', this.userMatches);
  }
}