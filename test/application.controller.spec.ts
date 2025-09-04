```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationController } from '../src/modules/application/application.controller';
import { ApplicationService } from '../src/modules/application/application.service';
import { GetApplicationsDto } from '../src/modules/application/dto/get-applications.dto';
import { Application } from '../src/modules/application/entities/application.entity';
import { User } from '../src/modules/user/entities/user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Response } from 'express';

// Mock data for testing
const mockUser: User = { id: 1, name: 'Test User', email: 'test@example.com', region: 'Test Region', interests: [], createdAt: new Date(), updatedAt: new Date() };
const mockApplications: Application[] = [
  { id: 1, title: 'Application 1', content: 'Content 1', createdAt: new Date(), updatedAt: new Date(), user: mockUser },
  { id: 2, title: 'Application 2', content: 'Content 2', createdAt: new Date(), updatedAt: new Date(), user: mockUser },
];

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
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        }
      ],
    }).compile();

    controller = module.get<ApplicationController>(ApplicationController);
    service = module.get<ApplicationService>(ApplicationService);


  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getApplications', () => {
    it('should return applications with pagination', async () => {
      const mockGetApplicationsDto: GetApplicationsDto = { page: 1, pageSize: 1 };
      const res: any = {
        json: jest.fn(),
      };

      jest.spyOn(service, 'getApplications').mockResolvedValue({
        applications: [mockApplications[0]],
        totalCount: mockApplications.length,
      });
      const req = { user: mockUser } as any; // Mock user for testing
      await controller.getApplications(mockGetApplicationsDto, res, req);
      expect(service.getApplications).toHaveBeenCalledWith(mockGetApplicationsDto, req.user);
      expect(res.json).toHaveBeenCalledWith({
        applications: [mockApplications[0]],
        totalCount: mockApplications.length,
      });


    });

    // Add more tests for filtering, sorting, and CSV download
  });
});
```