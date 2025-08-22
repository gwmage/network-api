import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createProfileDto: CreateProfileDto, userId: number) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {      
      return null
    } else {
      user.profile = createProfileDto
      return this.usersRepository.save(user);
    }
  }

  findOne(id: number) {
    return this.usersRepository.findOne({where: {id}, relations: ['profile']});
  }

  async update(id: number, updateProfileDto: UpdateProfileDto, userId: number) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      return null
    }
    user.profile = updateProfileDto
    return this.usersRepository.save(user);
  }
}