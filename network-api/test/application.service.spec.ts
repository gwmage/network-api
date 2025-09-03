{"import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationService } from '../src/modules/application/application.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Application } from '../src/modules/application/entities/application.entity';
import { Repository } from 'typeorm';
import { ApplicationInfoDto } from '../src/modules/application/dto/application-info.dto';

describe('ApplicationService', () => {
  let service: ApplicationService;
  let repository: Repository<Application>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApplicationService,
        {
          provide: getRepositoryToken(Application),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ApplicationService>(ApplicationService);
    repository = module.get<Repository<Application>>(getRepositoryToken(Application));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should save application info', async () => {
    const mockApplicationInfo: ApplicationInfoDto = {
      name: 'Test User',
      email: 'test@example.com',
      phoneNumber: '010-1234-5678',
      title: 'Test Application',
      content: 'This is a test application',
    };
    const mockApplication: Application = {
      id: 1,
      ...mockApplicationInfo,
      createdAt: new Date(),
      updatedAt: new Date(),
      user: null, // You might need to adjust this based on your Application entity
    } as Application;
    const saveSpy = jest.spyOn(repository, 'save').mockResolvedValue(mockApplication);

    const result = await service.saveApplication(mockApplicationInfo);

    expect(result).toEqual(mockApplication);
    expect(saveSpy).toHaveBeenCalledWith(mockApplicationInfo);
  });
});