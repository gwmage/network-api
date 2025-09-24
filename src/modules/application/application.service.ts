import { Injectable } from '@nestjs/common';
import { GetApplicationDto } from './dto/get-application.dto';
import { Application } from './entities/application.entity';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateApplicationDto } from './dto/create-application.dto';
import { User } from '../auth/entities/user.entity';
import { GetApplicationsDto } from './dto/get-applications.dto';
import { GetUserApplicationsDto } from './dto/get-user-applications.dto';
import { Parser } from 'json2csv';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    applicationRepository: Repository<Application>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getApplications(getApplicationsDto: GetApplicationsDto, user: User): Promise<{ applications: Application[], totalCount: number }> {
    const { page, pageSize, sortField, sortOrder, search } = getApplicationsDto;

    const query = this.applicationRepository.createQueryBuilder('application');

    // Filter by user ID from the token
    query.andWhere('application.userId = :userId', { userId: user.id });

    if (search) {
      query.andWhere('application.title LIKE :search', { search: `%${search}%` });
    }

    if (sortField && sortOrder) {
      query.orderBy(sortField, sortOrder);
    }

    const totalCount = await query.getCount();

    if (page && pageSize) {
      query.skip((page - 1) * pageSize).take(pageSize);
    }

    const applications = await query.getMany();

    return { applications, totalCount };
  }

  async createApplication(createApplicationDto: CreateApplicationDto, user:User): Promise<Application> {
    const newApplication = this.applicationRepository.create({
      ...createApplicationDto,
      user, // Associate the application with the logged-in user
    });
    return await this.applicationRepository.save(newApplication);
  }

  async getUserApplications(userId: number, getUserApplicationsDto: GetUserApplicationsDto): Promise<{ applications: Application[]; totalCount: number }> {
    const { page, pageSize, search, status } = getUserApplicationsDto;
    const query = this.applicationRepository.createQueryBuilder('application');

    query.where('application.userId = :userId', { userId });

    if (search) {
      query.andWhere('application.title LIKE :search', { search: `%${search}%` });
    }

    if (status) {
      query.andWhere('application.status = :status', { status });
    }

    const totalCount = await query.getCount();

    if (page && pageSize) {
      query.skip((page - 1) * pageSize).take(pageSize);
    }

    const applications = await query.getMany();
    return { applications, totalCount };
  }


  async downloadUserApplications(userId: number, format: string): Promise<string | Buffer> {
      const applications = await this.applicationRepository.find({
          where: { userId },
      });

      if (format.toLowerCase() === 'csv') {
          const parser = new Parser();
          const csv = parser.parse(applications);
          return csv;
      } else {
          // Handle other formats if needed (e.g., Excel)
          return Buffer.from(JSON.stringify(applications));
      }

  }
}
