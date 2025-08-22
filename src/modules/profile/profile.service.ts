import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async create(userId: number, createProfileDto: CreateProfileDto) {
    const profile = this.profileRepository.create({
      ...createProfileDto,
      user: { id: userId },
    });
    return this.profileRepository.save(profile);
  }

  findOne(id: number) {
    return this.profileRepository.findOne({ where: { id } });
  }

  async update(userId: number, updateProfileDto: UpdateProfileDto) {
    const profile = await this.profileRepository.findOne({
      where: { user: { id: userId } },
    });
    if (!profile) {
      throw new Error('Profile not found'); // Or a custom exception
    }
    Object.assign(profile, updateProfileDto); // Or use a more specific update method
    return this.profileRepository.save(profile);
  }
}