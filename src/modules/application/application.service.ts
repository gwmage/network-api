```typescript
import { Injectable } from '@nestjs/common';
import { GetApplicationDto } from './dto/get-application.dto';
import { Application } from './entities/application.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateApplicationDto } from './dto/create-application.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getApplication(getApplicationDto: GetApplicationDto, user: User): Promise<{ applications: Application[], totalCount: number }> {
    const { page, pageSize, sortField, sortOrder, filter } = getApplicationDto;

    const query = this.applicationRepository.createQueryBuilder('application');

    // Filter by user ID from the token
    query.andWhere('application.userId = :userId', { userId: user.id });

    if (filter) {
      if (filter.name) {
        query.andWhere('application.name LIKE :name', { name: `%${filter.name}%` });
      }
      if (filter.status) {
        query.andWhere('application.status = :status', { status: filter.status });
      }
      // Add other filter conditions as needed
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