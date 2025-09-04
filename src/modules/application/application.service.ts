```typescript
import { Injectable } from '@nestjs/common';
import { GetApplicationDto } from './dto/get-application.dto';
import { Application } from './entities/application.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateApplicationDto } from './dto/create-application.dto';
import { User } from '../user/entities/user.entity';
import { GetApplicationsDto } from './dto/get-applications.dto';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>,
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

}
```