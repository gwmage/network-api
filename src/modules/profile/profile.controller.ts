import { Body, Controller, Get, Post, Put, Req, Param, ParseIntPipe } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileService } from './profile.service';
import { Request } from 'express';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  create(@Body() createProfileDto: CreateProfileDto, @Req() req: Request) {
    return this.profileService.create(createProfileDto, req.user['id']);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.profileService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProfileDto: UpdateProfileDto, @Req() req: Request) {
    return this.profileService.update(id, updateProfileDto, req.user['id']);
  }
}