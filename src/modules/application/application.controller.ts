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
    const { applications, totalCount } = await this.applicationService.getApplications(getApplicationsDto);

    // Return as JSON by default
    if (!getApplicationsDto.format || getApplicationsDto.format === 'json') {
      return res.json({ applications, totalCount });
    }

    // Return as CSV if format is specified as 'csv'
    if (getApplicationsDto.format === 'csv') {
      const parser = new Parser();
      const csv = parser.parse(applications);
      res.setHeader('Content-Type', 'text/csv');
      res.attachment('applications.csv');
      return res.send(csv);
    }
  }

  @Post()
  async createApplication(@Body() networkingApplicationDto: NetworkingApplicationDto) {
    return this.applicationService.createApplication(networkingApplicationDto);
  }
}

```