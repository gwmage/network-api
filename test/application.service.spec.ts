```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationService } from '../src/modules/application/application.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Application } from '../src/modules/application/entities/application.entity';
import { User } from '../src/modules/user/entities/user.entity';
import { Repository } from 'typeorm';
import { GetApplicationsDto } from '../src/modules/application/dto/get-applications.dto';

// Mock data
const mockUser: User = { id: 1, name: 'Test User', email: 'test@example.com', region: 'Test Region', interests: [], createdAt: new Date(), updatedAt: new Date() };

const mockApplications: Application[] = [
  { id: 1, title: 'Application 1', content: 'Content 1', user: mockUser, createdAt: new Date(), updatedAt: new Date() },
  { id: 2, title: 'Application 2', content: 'Content 2', user: mockUser, createdAt: new Date(), updatedAt: new Date() },
];

describe('ApplicationService', () => {
  let service: ApplicationService;
  let applicationRepository: Repository<Application>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApplicationService,
        {
          provide: getRepositoryToken(Application),
          useValue: {
            createQueryBuilder: jest.fn(() => ({
              andWhere: jest.fn().mockReturnThis(),
              orderBy: jest.fn().mockReturnThis(),
              skip: jest.fn().mockReturnThis(),
              take: jest.fn().mockReturnThis(),
              getCount: jest.fn().mockResolvedValue(mockApplications.length),
              getMany: jest.fn().mockResolvedValue(mockApplications),


            })),
            create: jest.fn((entity) => entity),
            save: jest.fn((entity) => Promise.resolve(entity)),

          },
        },
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ApplicationService>(ApplicationService);
    applicationRepository = module.get<Repository<Application>>(getRepositoryToken(Application));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  describe('getApplications', () => {
    it('should return paginated applications', async () => {

      const getApplicationsDto: GetApplicationsDto = {
        page: 1,
        pageSize: 10,
      };
      const result = await service.getApplications(getApplicationsDto, mockUser);
      expect(result.applications).toEqual(mockApplications);
      expect(result.totalCount).toEqual(mockApplications.length);
    });


    // Add more tests for filtering, sorting
  });
});
```
---[END_OF_FILES]---