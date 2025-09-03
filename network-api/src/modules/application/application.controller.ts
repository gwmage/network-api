{"import { Body, Controller, Post } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplicationInfoDto } from './dto/application-info.dto';
import { Application } from './entities/application.entity';

@Controller('applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  async saveApplication(@Body() applicationInfoDto: ApplicationInfoDto): Promise<Application> {
    return this.applicationService.saveApplication(applicationInfoDto);
  }
}