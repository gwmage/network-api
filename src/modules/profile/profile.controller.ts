import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req, @Body() createProfileDto: CreateProfileDto) {
    return this.profileService.create(req.user.id, createProfileDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  update(@Req() req, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(req.user.id, updateProfileDto);
  }
}
