```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './profile.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileRepository extends Repository<Profile> {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {
    super(profileRepository.target, profileRepository.manager, profileRepository.queryRunner);
  }

  async createProfile(createProfileDto: CreateProfileDto): Promise<Profile> {
    const newProfile = this.create(createProfileDto);
    await this.save(newProfile);
    return newProfile;
  }

  async updateProfile(id: number, updateProfileDto: UpdateProfileDto): Promise<Profile> {
    await this.update(id, updateProfileDto);
    return this.findOne({ where: { id } });
  }

  async findProfileById(id: number): Promise<Profile> {
    return this.findOne({ where: { id } });
  }
}
```