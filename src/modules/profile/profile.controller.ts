import { Body, Controller, Get, Post, Put, Req, Request } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  create(@Req() req: Request, @Body() createProfileDto: CreateProfileDto) {
    return this.profileService.create(req.user['id'], createProfileDto);
  }

  @Get()
  findOne(@Req() req: Request) {
    return this.profileService.findOne(req.user['id']);
  }

  @Put()
  update(@Req() req: Request, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(req.user['id'], updateProfileDto);
  }
}