```typescript
import { Body, Controller, Get, Param, Post, Put, Req, UseGuards, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileService } from './profile.service';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createProfileDto: CreateProfileDto, @Req() req: Request) {
    return await this.profileService.create(createProfileDto, req.user['id']);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() req: Request) {
    const profile = await this.profileService.findOne(req.user['id']);
    if (!profile) {
      throw new NotFoundException('Profile not found.');
    }
    return profile;
  }


  @Put()
  @UseGuards(JwtAuthGuard)
  async update(@Body() updateProfileDto: UpdateProfileDto, @Req() req: Request) {
    const updatedProfile = await this.profileService.update(req.user['id'], updateProfileDto);
    if (!updatedProfile) {
      throw new NotFoundException('Profile not found.');
    }
    return updatedProfile;
  }
}

```