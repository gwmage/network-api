```typescript
import { Controller, Get, Query, Res, Post, Body } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { GetApplicationsDto } from './dto/get-applications.dto';
import { Response } from 'express';
import { Parser } from 'json2csv';
import { NetworkingApplicationDto } from './dto/networking-application.dto';

@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Get()
  async getApplications(
    @Query() getApplicationsDto: GetApplicationsDto,
    @Res() res: Response,
  ) {
    // ... controller method implementation
  }

  @Post()
  async createApplication(@Body() networkingApplicationDto: NetworkingApplicationDto) {
    return this.applicationService.createApplication(networkingApplicationDto);
  }
}
```