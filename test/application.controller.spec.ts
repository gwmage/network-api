```typescript

import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationController } from '../src/modules/application/application.controller';
import { ApplicationService } from '../src/modules/application/application.service';
import { GetApplicationsDto } from '../src/modules/application/dto/get-applications.dto';
import { Response, Request } from 'express';
import { NetworkingApplicationDto } from '../src/modules/application/dto/networking-application.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../src/modules/user/entities/user.entity';
import { GetUserApplicationsDto } from '../src/modules/application/dto/get-user-applications.dto';
import { Application } from '../src/modules/application/entities/application.entity';


const mockApplicationService = () => ({
    getApplications: jest.fn(),
    createApplication: jest.fn(),
    getUserApplications: jest.fn(),
    downloadUserApplications: jest.fn(),

});

describe('ApplicationController', () => {
    let controller: ApplicationController;
    let service: ApplicationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplicationController],
      providers: [
        {
          provide: ApplicationService,
          useFactory: mockApplicationService,
        },
      ],
    })
    .overrideGuard(AuthGuard('jwt'))
    .useValue({ canActivate: () => true })
    .compile();

    controller = module.get<ApplicationController>(ApplicationController);
    service = module.get<ApplicationService>(ApplicationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });



    describe('getApplications', () => {
        it('should return applications as JSON', async () => {
            const mockApplications = [{ id: 1, title: 'Test Application 1' }, { id: 2, title: 'Test Application 2' }];
            const totalCount = mockApplications.length;
            const getApplicationsDto: GetApplicationsDto = { page: 1, pageSize: 10 };
            const user: User = { id: 1, name: 'Test User', email: 'test@example.com', region: 'Test Region', interests: [], createdAt: new Date(), updatedAt: new Date(), applications: [] };
            const req = { user } as Request;

            const res = {
                json: jest.fn(),
            } as unknown as Response;

            (service.getApplications as jest.Mock).mockResolvedValue({ applications: mockApplications, totalCount });

            await controller.getApplications(getApplicationsDto, res, req);

            expect(service.getApplications).toHaveBeenCalledWith(getApplicationsDto, user);

            expect(res.json).toHaveBeenCalledWith({ applications: mockApplications, totalCount });

        });
    });

    describe('createApplication', () => {
        it('should create a new application', async () => {
            const networkingApplicationDto: NetworkingApplicationDto = { title: 'Test Application' };
            const user: User = { id: 1, name: 'Test User', email: 'test@example.com', region: 'Test Region', interests: [], createdAt: new Date(), updatedAt: new Date(), applications: [] };
            const req = { user } as Request;
            const createdApplication = { id: 1, ...networkingApplicationDto };
            (service.createApplication as jest.Mock).mockResolvedValue(createdApplication);
            const result = await controller.createApplication(networkingApplicationDto, req);
            expect(result).toEqual(createdApplication);

            expect(service.createApplication).toHaveBeenCalledWith(networkingApplicationDto, user);

        });
    });



    describe('getUserApplications', () => {
        it('should return applications for a specific user', async () => {
            const userId = 1;
            const getUserApplicationsDto: GetUserApplicationsDto = { page: 1, pageSize: 10, search: 'Test' };
            const mockApplications = [{ id: 1, title: 'Test Application 1', applicationDate: new Date(), user: { id: 1 } as User, userId }, { id: 2, title: 'Test Application 2', applicationDate: new Date(), user: { id: 1 } as User, userId }];
            const totalCount = mockApplications.length;


            (service.getUserApplications as jest.Mock).mockResolvedValue({ applications: mockApplications, totalCount });

            const result = await controller.getUserApplications(userId, getUserApplicationsDto);

            expect(service.getUserApplications).toHaveBeenCalledWith(userId, getUserApplicationsDto);
            expect(result).toEqual({ applications: mockApplications, totalCount });
        });
    });


    describe('downloadUserApplications', () => {
        it('should download user applications in CSV format', async () => {
            const userId = 1;
            const format = 'csv';
            const mockApplications: Application[] = [
                { id: 1, title: 'Application 1', applicationDate: new Date(), user: { id: 1 } as User, userId, status: 'pending' },
                { id: 2, title: 'Application 2', applicationDate: new Date(), user: { id: 1 } as User, userId, status: 'approved' },
            ];

            const csvString = 'mock csv string';
            const res = {
                setHeader: jest.fn(),
                attachment: jest.fn(),
                send: jest.fn(),
                json: jest.fn(),
            } as unknown as Response;
            (service.downloadUserApplications as jest.Mock).mockResolvedValue(csvString);


            await controller.downloadUserApplications(userId, format, res);

            expect(service.downloadUserApplications).toHaveBeenCalledWith(userId, format);
            expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'text/csv');
            expect(res.attachment).toHaveBeenCalledWith(`user-${userId}-applications.csv`);
            expect(res.send).toHaveBeenCalledWith(csvString);

        });
    });


});
```
---[END_OF_FILES]---