```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from './application.entity';

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

  // Add other methods for pagination, search, and download as needed.
}
```