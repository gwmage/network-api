```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationController } from '../src/modules/application/application.controller';
import { ApplicationService } from '../src/modules/application/application.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Application } from '../src/modules/application/entities/application.entity';
import { Repository } from 'typeorm';
import { CreateApplicationDto } from '../src/modules/application/dto/create-application.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { User } from '../src/modules/users/entities/user.entity';

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

  describe('findAll', () => {
    it('should return paginated applications', async () => {
      // ... (Existing code)
    });

    it('should handle errors when retrieving applications', async () => {
      // ... (Existing code)
    });

    it('should handle invalid token', async () => {
      jest.spyOn(service, 'findAll').mockRejectedValue(new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED));

      try {
        await controller.findAll({ page: 1, limit: 10 });
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.getStatus()).toBe(HttpStatus.UNAUTHORIZED);
      }
    });

    it('should return applications for a specific user with valid token', async () => {
      const page = 1;
      const limit = 10;
      const user: User = { id: 1 } as User; // Mock user
      const mockApplications: Application[] = [
        { id: 1, userId: 1, region: '서울', career: '1년', selfIntroduction: '자기소개', portfolioUrl: 'url', createdAt: new Date(), updatedAt: new Date() } as Application,
      ];
      const mockCount = 1;


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
      expect(await controller.findAll({ page, limit }, user)).toEqual({
        items: mockApplications,
        meta: {
          totalItems: mockCount,
          itemCount: mockApplications.length,
          itemsPerPage: limit,
          totalPages: Math.ceil(mockCount / limit),
          currentPage: page,
        },
      });
      expect(service.findAll).toHaveBeenCalledWith(user, { page, limit });
    });
  });
});

```