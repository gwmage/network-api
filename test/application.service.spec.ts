import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationService } from '../src/modules/application/application.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Application } from '../src/modules/application/entities/application.entity';
import { User } from '../src/modules/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateApplicationDto } from '../src/modules/application/dto/create-application.dto';
import { GetApplicationsDto } from '../src/modules/application/dto/get-applications.dto';
import { GetUserApplicationsDto } from '../src/modules/application/dto/get-user-applications.dto';

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
    console.log("ApplicationService test completed");
  });

  describe('createApplication', () => {
    it('should create a new application', async () => {
      const createApplicationDto: CreateApplicationDto = {
        title: 'Test Application',
        description: 'Test Description',
      };
      const user = new User();
      const createdApplication = new Application();
      createdApplication.user = user; // Associate the application with the user

      jest.spyOn(applicationRepository, 'create').mockReturnValue(createdApplication);
      jest.spyOn(applicationRepository, 'save').mockResolvedValue(createdApplication);

      const result = await service.createApplication(createApplicationDto, user);

      expect(result).toEqual(createdApplication);
      expect(applicationRepository.create).toHaveBeenCalledWith({
        ...createApplicationDto,
        user,
      });
      expect(applicationRepository.save).toHaveBeenCalledWith(createdApplication);
      console.log("createApplication test completed");
    });
  });
});
