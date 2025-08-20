```typescript
import { Controller, Get, Query, Res } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { GetApplicationsDto } from './dto/get-applications.dto';
import { Response } from 'express';
import { Parser } from 'json2csv';

@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Get()
  async getApplications(
    @Query() getApplicationsDto: GetApplicationsDto,
    @Res() res: Response,
  ) {
    const { applications, count } =
      await this.applicationService.getApplications(getApplicationsDto);

    if (getApplicationsDto.download) {
      const json2csvParser = new Parser();
      const csv = json2csvParser.parse(applications);
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=applications.csv');
      return res.send(csv);
    }

    return res.json({
      applications,
      totalCount: count,
    });
  }
}

```