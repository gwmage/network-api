```typescript
import { Injectable } from '@nestjs/common';
import { GetApplicationDto } from './dto/get-application.dto';
import { Application } from './entities/application.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateApplicationDto } from './dto/create-application.dto';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>,
  ) {}

  async getApplication(getApplicationDto: GetApplicationDto): Promise<Application[]> {
    const { page, pageSize, sortField, sortOrder, filter } = getApplicationDto;

    const query = this.applicationRepository.createQueryBuilder('application');

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

    if (page && pageSize) {
      query.skip((page - 1) * pageSize).take(pageSize);
    }

    return await query.getMany();
  }


  async createApplication(createApplicationDto: CreateApplicationDto): Promise<Application> {
    const newApplication = this.applicationRepository.create(createApplicationDto);
    return await this.applicationRepository.save(newApplication);
  }


}
```