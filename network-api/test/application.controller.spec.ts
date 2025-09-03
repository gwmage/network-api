{"import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationController } from '../src/modules/application/application.controller';
import { ApplicationService } from '../src/modules/application/application.service';
import { ApplicationInfoDto } from '../src/modules/application/dto/application-info.dto';
import { Application } from '../src/modules/application/entities/application.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('ApplicationController', () => {
  let controller: ApplicationController;
  let service: ApplicationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplicationController],
      providers: [
        ApplicationService,
        {
          provide: getRepositoryToken(Application),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<ApplicationController>(ApplicationController);
    service = module.get<ApplicationService>(ApplicationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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
    jest.spyOn(service, 'saveApplication').mockResolvedValue(mockApplication);

    const result = await controller.saveApplication(mockApplicationInfo);

    expect(result).toEqual(mockApplication);
    expect(service.saveApplication).toHaveBeenCalledWith(mockApplicationInfo);
  });

  // Add more tests for error scenarios (validation, database errors, etc.)
});