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

  describe('create', () => {
    it('should create an application', async () => {
      const createApplicationDto: CreateApplicationDto = {
        // Provide valid data for the DTO
        region: 'test region',
        preference: 'test preference',
        selfIntroduction: 'test self introduction',
        career: 'test career',
        // ... other required fields
      };
      const createdApplication: Application = {
        id: 1,
        ...createApplicationDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as Application; // Type casting for simplicity
      jest.spyOn(service, 'create').mockResolvedValue(createdApplication);
      expect(await controller.create(createApplicationDto)).toEqual(
        createdApplication,
      );
    });

    it('should handle validation errors', async () => {
      const createApplicationDto: CreateApplicationDto = {
        // Provide invalid data for the DTO (e.g., missing required fields, invalid formats)
        region: '', // Invalid region
        preference: '', // Invalid preference,
        selfIntroduction: '',
        career: ''
        // ... other fields
      };
      const errorMessage = 'Validation failed'; // Or a more specific error message
      jest.spyOn(service, 'create').mockRejectedValue(new HttpException(errorMessage, HttpStatus.BAD_REQUEST));

      try {
        await controller.create(createApplicationDto);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.getStatus()).toBe(HttpStatus.BAD_REQUEST);
        expect(error.message).toBe(errorMessage)
        // Add more specific assertions based on your validation rules and error handling
      }
    });
  });


  // Add more test cases for other controller methods (e.g., findAll, findOne, update, remove) and other error scenarios
});
```