import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(createProfileDto: CreateProfileDto, userId: number): Promise<Profile> {
    const user = await this.userRepository.findOne({where: {id: userId}});
    if (!user) {
      throw new Error('User not found'); 
    }
    const profile = this.profileRepository.create(createProfileDto);
    user.profile = profile;  
    await this.userRepository.save(user); 
    return profile;
  }

  async update(id: number, updateProfileDto: UpdateProfileDto, userId: number): Promise<Profile> {
    const user = await this.userRepository.findOne({where: {id: userId}, relations: ['profile']});
    if (!user) {
      throw new Error('User not found');
    }
    if (!user.profile) {
      throw new Error('Profile not found');
    }
    Object.assign(user.profile, updateProfileDto); 
    await this.userRepository.save(user);
    return user.profile;
  }
}