```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationController } from '../src/modules/application/application.controller';
import { ApplicationService } from '../src/modules/application/application.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Application } from '../src/modules/application/entities/application.entity';
import { Repository } from 'typeorm';
import { CreateApplicationDto } from '../src/modules/application/dto/create-application.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

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

  // ... other tests ...

  describe('findAll', () => {
    it('should return paginated applications', async () => {
      const page = 1;
      const limit = 10;
      const mockApplications: Application[] = [
        { id: 1, userId: 1, region: '서울', career: '1년', selfIntroduction: '자기소개', portfolioUrl: 'url', createdAt: new Date(), updatedAt: new Date() } as Application,
        { id: 2, userId: 2, region: '경기', career: '2년', selfIntroduction: '자기소개2', portfolioUrl: 'url2', createdAt: new Date(), updatedAt: new Date() } as Application,
      ];
      const mockCount = 2;
      jest.spyOn(service, 'findAll').mockResolvedValue({
        items: mockApplications,
        meta: {
          totalItems: mockCount,
          itemCount: mockApplications.length,
          itemsPerPage: limit,
          totalPages: Math.ceil(mockCount / limit),
          currentPage: page,
        },
      });
      expect(await controller.findAll({ page, limit })).toEqual({
        items: mockApplications,
        meta: {
          totalItems: mockCount,
          itemCount: mockApplications.length,
          itemsPerPage: limit,
          totalPages: Math.ceil(mockCount / limit),
          currentPage: page,
        },
      });
    });

    it('should handle errors when retrieving applications', async () => {
      const errorMessage = 'Error retrieving applications';
      jest.spyOn(service, 'findAll').mockRejectedValue(new HttpException(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR));

      try {
        await controller.findAll({ page: 1, limit: 10 });
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        expect(error.message).toBe(errorMessage);
      }
    });


    it('should handle invalid token', async () => {
     // Implement test for invalid token. This depends on your authentication implementation
    });


  });
});

```