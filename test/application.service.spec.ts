```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationService } from '../src/modules/application/application.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Application } from '../src/modules/application/entities/application.entity';
import { User } from '../src/modules/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateApplicationDto } from '../src/modules/application/dto/create-application.dto';
import { GetApplicationsDto } from '../src/modules/application/dto/get-applications.dto';
import { GetUserApplicationsDto } from '../src/modules/application/dto/get-user-applications.dto';


const mockApplicationRepository = () => ({
    find: jest.fn(),
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    createQueryBuilder: jest.fn(() => ({
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        getManyAndCount: jest.fn(),
        getMany: jest.fn(),
        getCount: jest.fn(),
        orderBy: jest.fn().mockReturnThis(),
      })),
  });

const mockUserRepository = () => ({
    find: jest.fn(),
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
});

  
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
          useFactory: mockApplicationRepository,
        },
        {
          provide: getRepositoryToken(User),
          useFactory: mockUserRepository,
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

  describe('createApplication', () => {
    it('should create a new application', async () => {
      const createApplicationDto: CreateApplicationDto = { title: 'Test Application' };
      const user: User = { id: 1, name: 'Test User', email: 'test@example.com', region: 'Test Region', interests: [], createdAt: new Date(), updatedAt: new Date(), applications: [] };
      const createdApplication: Application = { id: 1, title: 'Test Application', applicationDate: new Date(), user, userId: user.id, status: null };
      (applicationRepository.create as jest.Mock).mockReturnValue(createdApplication);
      (applicationRepository.save as jest.Mock).mockResolvedValue(createdApplication);

      const result = await service.createApplication(createApplicationDto, user);
      expect(result).toEqual(createdApplication);
      expect(applicationRepository.create).toHaveBeenCalledWith({ ...createApplicationDto, user});
      expect(applicationRepository.save).toHaveBeenCalledWith(createdApplication);


    });
  });

  describe('getApplications', () => {
    it('should return applications with pagination and filtering', async () => {
        const user: User = { id: 1, name: 'Test User', email: 'test@example.com', region: 'Test Region', interests: [], createdAt: new Date(), updatedAt: new Date(), applications: [] };
        const getApplicationsDto: GetApplicationsDto = { page: 1, pageSize: 10, search: 'Test' };
        const mockApplications: Application[] = [{ id: 1, title: 'Test Application 1', applicationDate: new Date(), user, userId: user.id, status: null }, { id: 2, title: 'Test Application 2', applicationDate: new Date(), user, userId: user.id, status: null }];
        const totalCount = mockApplications.length;
        const queryBuilder = {
            andWhere: jest.fn().mockReturnThis(),
            orderBy: jest.fn().mockReturnThis(),
            skip: jest.fn().mockReturnThis(),
            take: jest.fn().mockReturnThis(),
            getMany: jest.fn().mockResolvedValue(mockApplications),
            getCount: jest.fn().mockResolvedValue(totalCount),
          };
          (applicationRepository.createQueryBuilder as jest.Mock).mockReturnValue(queryBuilder);

          const result = await service.getApplications(getApplicationsDto, user);

          expect(result).toEqual({ applications: mockApplications, totalCount });
          expect(queryBuilder.andWhere).toHaveBeenCalledWith('application.userId = :userId', { userId: user.id });
          expect(queryBuilder.andWhere).toHaveBeenCalledWith('application.title LIKE :search', { search: `%${getApplicationsDto.search}%` });

        expect(queryBuilder.skip).toHaveBeenCalledWith((getApplicationsDto.page - 1) * getApplicationsDto.pageSize);

        expect(queryBuilder.skip).toHaveBeenCalledWith((getApplicationsDto.page - 1) * getApplicationsDto.pageSize);
        expect(queryBuilder.take).toHaveBeenCalledWith(getApplicationsDto.pageSize);
        expect(queryBuilder.getMany).toHaveBeenCalled();
        expect(queryBuilder.getCount).toHaveBeenCalled();

    });
  });


    describe('getUserApplications', () => {
        it('should return applications for a specific user with pagination and search', async () => {
            const userId = 1;
            const getUserApplicationsDto: GetUserApplicationsDto = { page: 1, pageSize: 10, search: 'Test', status: 'submitted' };
            const mockApplications: Application[] = [{ id: 1, title: 'Test Application 1', applicationDate: new Date(), user: { id: 1 } as User, userId, status: 'submitted' }, { id: 2, title: 'Test Application 2', applicationDate: new Date(), user: { id: 1 } as User, userId, status: 'submitted' }];

            const totalCount = mockApplications.length;

            const queryBuilder = {
                where: jest.fn().mockReturnThis(),
                andWhere: jest.fn().mockReturnThis(),
                skip: jest.fn().mockReturnThis(),
                take: jest.fn().mockReturnThis(),
                getMany: jest.fn().mockResolvedValue(mockApplications),
                getCount: jest.fn().mockResolvedValue(totalCount),
              };
            (applicationRepository.createQueryBuilder as jest.Mock).mockReturnValue(queryBuilder);


            const result = await service.getUserApplications(userId, getUserApplicationsDto);
            expect(result).toEqual({ applications: mockApplications, totalCount });

            expect(queryBuilder.where).toHaveBeenCalledWith('application.userId = :userId', { userId });
            expect(queryBuilder.andWhere).toHaveBeenCalledWith('application.title LIKE :search', { search: `%${getUserApplicationsDto.search}%` });
            expect(queryBuilder.andWhere).toHaveBeenCalledWith('application.status = :status', { status: getUserApplicationsDto.status });
            expect(queryBuilder.skip).toHaveBeenCalledWith(0); // (page - 1) * pageSize
            expect(queryBuilder.take).toHaveBeenCalledWith(10); // pageSize

        });
    });


    describe('downloadUserApplications', () => {

        it('should download user applications in CSV format', async () => {
            const userId = 1;
            const format = 'csv';
            const mockApplications: Application[] = [
                { id: 1, title: 'Application 1', applicationDate: new Date(), user: { id: 1 } as User, userId: 1, status: 'pending' },
                { id: 2, title: 'Application 2', applicationDate: new Date(), user: { id: 1 } as User, userId: 1, status: 'approved' },
            ];
            (applicationRepository.find as jest.Mock).mockResolvedValue(mockApplications);

            const result = await service.downloadUserApplications(userId, format);
            expect(typeof result).toBe('string');
            expect(result.includes('Application 1')).toBeTruthy();
            expect(result.includes('Application 2')).toBeTruthy();
            expect(result.includes('pending')).toBeTruthy();
            expect(result.includes('approved')).toBeTruthy();

        });
    });
});

```