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
  let repository: Repository<Application>;

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
    repository = module.get<Repository<Application>>(getRepositoryToken(Application));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create an application', async () => {
      const createApplicationDto: CreateApplicationDto = {
        userId: 1,
        region: '서울',
        career: '1년',
        selfIntroduction: '자기소개',
        portfolioUrl: 'url',
      };
      const createdApplication: Application = {
        id: 1,
        ...createApplicationDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as Application;
      jest.spyOn(service, 'create').mockResolvedValue(createdApplication);
      expect(await controller.create(createApplicationDto)).toEqual(createdApplication);
    });

    it('should handle errors during application creation', async () => {
      const createApplicationDto: CreateApplicationDto = {
        userId: 1,
        region: '서울',
        career: '1년',
        selfIntroduction: '자기소개',
        portfolioUrl: 'url',
      };
      const errorMessage = 'Error creating application';
      jest.spyOn(service, 'create').mockRejectedValue(new HttpException(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR));

      try {
        await controller.create(createApplicationDto);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        expect(error.message).toBe(errorMessage);
      }
    });

    it('should handle validation errors', async () => {
      const createApplicationDto = {} as CreateApplicationDto; // Invalid DTO
      try {
        await controller.create(createApplicationDto);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.getStatus()).toBe(HttpStatus.BAD_REQUEST);
      }
    })
  });


  describe('findAll', () => {
    // ... existing findAll tests ...
  });
});

```