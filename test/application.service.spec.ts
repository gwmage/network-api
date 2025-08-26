```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationService } from '../src/modules/application/application.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Application } from '../src/modules/application/entities/application.entity';
import { Repository } from 'typeorm';
import { User } from '../src/modules/auth/entities/user.entity';
import { PaginatedApplicationsDto } from '../src/modules/application/dto/paginated-applications.dto';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';

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
      const mockApplications: Application[] = [
        { id: 1, userId: 1, region: '서울', career: '1년', selfIntroduction: '자기소개', portfolioUrl: 'url', createdAt: new Date(), updatedAt: new Date() } as Application,
        { id: 2, userId: 2, region: '경기', career: '2년', selfIntroduction: '자기소개2', portfolioUrl: 'url2', createdAt: new Date(), updatedAt: new Date() } as Application,
      ];
      const mockCount = mockApplications.length;
      const page = 1;
      const limit = 10;

      jest.spyOn(applicationRepository, 'findAndCount').mockResolvedValue([mockApplications, mockCount]);

      const result: PaginatedApplicationsDto = {
        data: mockApplications,
        meta: {
          totalItems: mockCount,
          itemCount: mockApplications.length,
          itemsPerPage: limit,
          totalPages: Math.ceil(mockCount / limit),
          currentPage: page,
        },
      };
      expect(await service.findAll({ page, limit })).toEqual(result);
    });

    it('should filter applications by region', async () => {
      const filter: FindOptionsWhere<Application> = { region: '서울' };
      jest.spyOn(applicationRepository, 'findAndCount').mockImplementation(async (options) => {
        expect(options.where).toEqual(filter);
        return [[], 0];
      });
      await service.findAll({ page: 1, limit: 10, filter });
    });


    it('should sort applications by career', async () => {
      const order = { career: 'ASC' };
      jest.spyOn(applicationRepository, 'findAndCount').mockImplementation(async (options) => {
        expect(options.order).toEqual(order);
        return [[], 0];
      });

      await service.findAll({ page: 1, limit: 10, order });

    });
  });
});

```