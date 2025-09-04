```typescript
import { Controller, Get, Query, Res, Post, Body, HttpException, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { GetApplicationsDto } from './dto/get-applications.dto';
import { Response, Request } from 'express';
import { Parser } from 'json2csv';
import { NetworkingApplicationDto } from './dto/networking-application.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { User } from '../user/entities/user.entity';

@ApiTags('application')
@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get Applications', description: '신청 정보 조회 기능 개발' })
  @ApiQuery({ name: 'page', type: Number, required: false, description: 'Page number for pagination' })
  @ApiQuery({ name: 'pageSize', type: Number, required: false, description: 'Page size for pagination' })
  @ApiQuery({ name: 'sortField', type: String, required: false, description: 'Field to sort by' })
  @ApiQuery({ name: 'sortOrder', type: String, required: false, description: 'Sort order (ASC or DESC)' })
  @ApiQuery({ name: 'search', type: String, required: false, description: 'Search keyword' })
  @ApiQuery({ name: 'format', type: String, enum: ['json', 'csv'], required: false, description: 'Response format (json or csv)' })
  async getApplications(
    @Query() getApplicationsDto: GetApplicationsDto,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    try {
      const user = req.user as User;
      const { applications, totalCount } = await this.applicationService.getApplications(getApplicationsDto, user);

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
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async createApplication(@Body() networkingApplicationDto: NetworkingApplicationDto, @Req() req: Request) {
    try {
      const user = req.user as User;
      return await this.applicationService.createApplication(networkingApplicationDto, user);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

```