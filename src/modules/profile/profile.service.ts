```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './profile.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async createProfile(createProfileDto: CreateProfileDto): Promise<Profile> {
    const newProfile = this.profileRepository.create(createProfileDto);
    return await this.profileRepository.save(newProfile);
  }

  async getProfile(id: number): Promise<Profile | null> {
    return await this.profileRepository.findOneBy({ id });
  }

  async updateProfile(id: number, updateProfileDto: UpdateProfileDto): Promise<Profile | null> {
    const profile = await this.profileRepository.findOneBy({ id });
    if (!profile) {
      return null;
    }

    Object.assign(profile, updateProfileDto);
    return await this.profileRepository.save(profile);
  }

  async deleteProfile(id: number): Promise<void> {
    await this.profileRepository.delete(id);
  }
}
```