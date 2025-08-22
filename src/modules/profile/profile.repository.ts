import { EntityRepository, Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { User } from "../auth/entities/user.entity";

@EntityRepository(Profile)
export class ProfileRepository extends Repository<Profile> {}

// Assuming User entity is in the auth module
@EntityRepository(User) // Correct import path
export class UserRepository extends Repository<User> {}