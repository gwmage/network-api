```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationService } from '../src/application/application.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Application } from '../src/application/application.entity';
import { Repository } from 'typeorm';
import { User } from '../src/users/user.entity';
import { PaginatedApplicationsDto } from '../src/application/dto/paginated-applications.dto';

describe('ApplicationService', () => {
  let service: ApplicationService;
  let applicationRepository: Repository<Application>;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApplicationService,
        {
          provide: getRepositoryToken(Application),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ApplicationService>(ApplicationService);
    applicationRepository = module.get<Repository<Application>>(getRepositoryToken(Application));
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return paginated applications', async () => {
      const userId = 1;
      const page = 1;
      const limit = 10;

      const mockApplications: Application[] = [];
      const mockTotalCount = 0;

      jest.spyOn(applicationRepository, 'findAndCount').mockResolvedValue([mockApplications, mockTotalCount]);

      const result: PaginatedApplicationsDto = await service.findAll(userId, { page, limit });

      expect(result.data).toEqual(mockApplications);
      expect(result.meta.totalItems).toEqual(mockTotalCount);
      expect(result.meta.itemCount).toEqual(mockApplications.length);
      expect(result.meta.totalPages).toEqual(Math.ceil(mockTotalCount / limit));
      expect(result.meta.currentPage).toEqual(page);
      expect(result.meta.itemsPerPage).toEqual(limit);
    });
  });
});
```