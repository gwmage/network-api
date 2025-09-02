```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, Like, Equal } from 'typeorm';
import { Application } from './application.entity';
import { GetApplicationDto } from './dto/get-application.dto';
import { CreateApplicationDto } from './dto/create-application.dto';
import { User } from '../user/user.entity';


@Injectable()
export class ApplicationRepository extends Repository<Application> {
  constructor(
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>,
  ) {
    super(applicationRepository.target, applicationRepository.manager, applicationRepository.queryRunner);
  }

  async findApplicationsByUserId(userId: number): Promise<Application[]> {
    return this.applicationRepository.find({ where: { userId } });
  }

  async findApplications(
    userId: number,
    getApplicationDto: GetApplicationDto,
  ): Promise<[Application[], number]> {
    const { page, pageSize, sortField, sortOrder, filter } = getApplicationDto;

    const whereClause: FindOptionsWhere<Application> = { userId };

    if (filter) {
      if (filter.name) {
        whereClause.name = Like(`%${filter.name}%`);
      }
      if (filter.status) {
        whereClause.status = Equal(filter.status);
      }
      // Add other filter conditions as needed
    }

    const order = sortField ? { [sortField]: sortOrder } : {};


    return this.applicationRepository.findAndCount({
      where: whereClause,
      order,
      take: pageSize,
      skip: (page - 1) * pageSize,
    });
  }

  async createApplication(createApplicationDto: CreateApplicationDto, user: User): Promise<Application> {
    const newApplication = this.applicationRepository.create({
      ...createApplicationDto,
      user,
    });
    return this.applicationRepository.save(newApplication);
  }



}
```