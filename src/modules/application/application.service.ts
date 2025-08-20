```typescript
import { Injectable } from '@nestjs/common';
import { GetApplicationDto } from './dto/get-application.dto';
import { Application } from './application.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>,
  ) {}

  async getApplication(getApplicationDto: GetApplicationDto) {
    const { page, pageSize, search, userId } = getApplicationDto;

    const queryBuilder = this.applicationRepository
      .createQueryBuilder('application')
      .where('application.userId = :userId', { userId });

    if (search) {
      queryBuilder.andWhere('application.name LIKE :search', {
        search: `%${search}%`,
      });
    }

    const [applications, totalCount] = await queryBuilder
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    return {
      applications,
      totalCount,
    };
  }


  async getApplicationForDownload(userId: number) {
    const applications = await this.applicationRepository.find({
      where: { userId },
    });

    const formattedData = applications.map((application) => ({
      '신청 ID': application.id,
      '신청 이름': application.name,
      // ... other properties
    }));

    return formattedData;
  }
}
```