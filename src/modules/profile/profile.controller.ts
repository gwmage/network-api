import { Body, Controller, Get, Param, Post, Put, Req } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileService } from './profile.service';
import { Request } from 'express';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  create(@Req() req: Request, @Body() createProfileDto: CreateProfileDto) {
    return this.profileService.create(req.user.id, createProfileDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(+id);
  }

  @Put()
  update(@Req() req: Request, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(req.user.id, updateProfileDto);
  }
}