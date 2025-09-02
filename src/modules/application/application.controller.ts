```typescript
import { Controller, Get, Query, Res, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
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
    try {
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
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async createApplication(@Body() networkingApplicationDto: NetworkingApplicationDto) {
    try {
      return await this.applicationService.createApplication(networkingApplicationDto);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

```