```typescript
import { Controller, Get, Query, Res, Post, Body, HttpStatus, HttpException } from '@nestjs/common';
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
  async createApplication(@Body() networkingApplicationDto: NetworkingApplicationDto, @Res() res: Response) {
    try {
      const newApplication = await this.applicationService.createApplication(networkingApplicationDto);
      return res.status(HttpStatus.CREATED).json({ id: newApplication.id });
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          message: error.message,
        }, HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'An error occurred during application creation',
        }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}

```
