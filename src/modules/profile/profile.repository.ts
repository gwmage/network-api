```typescript
import { EntityRepository, Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { User } from "../auth/entities/user.entity";

@EntityRepository(Profile)
export class ProfileRepository extends Repository<Profile> {
  async createProfile(createProfileDto: any): Promise<Profile> { // Use any or specific DTO type
    const profile = this.create(createProfileDto);
    return this.save(profile);
  }

  async getProfileByUserId(userId: number): Promise<Profile | null> {
    return this.findOne({ where: { user: { id: userId } }, relations: ['user'] }); // Optimize by specifying relations
  }

  async getProfile(id: number): Promise<Profile | null> {
    return this.findOne({ where: { id }, relations: ['user'] }); // Optimize by specifying relations
  }


  async updateProfile(id: number, updateProfileDto: any): Promise<Profile | null> { // Use any or specific DTO type
    await this.update(id, updateProfileDto);
    return this.findOne({ where: { id } , relations: ['user']});
  }
}

```