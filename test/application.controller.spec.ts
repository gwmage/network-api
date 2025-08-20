```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationController } from '../src/application/application.controller';
import { ApplicationService } from '../src/application/application.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Application } from '../src/application/application.entity';
import { Repository } from 'typeorm';
import { User } from '../src/users/user.entity';
import { UsersService } from '../src/users/users.service';

describe('ApplicationController', () => {
  let controller: ApplicationController;
  let service: ApplicationService;
  let applicationRepository: Repository<Application>;
  let userRepository: Repository<User>;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplicationController],
      providers: [
        ApplicationService,
        UsersService,
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

    controller = module.get<ApplicationController>(ApplicationController);
    service = module.get<ApplicationService>(ApplicationService);
    applicationRepository = module.get<Repository<Application>>(getRepositoryToken(Application));
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of applications', async () => {
      const result: Application[] = []; // Replace with mock data if needed
      jest.spyOn(service, 'findAll').mockResolvedValue(result);
      expect(await controller.findAll()).toBe(result);
    });
  });

  // Add more test cases for other controller methods (e.g., create, findOne, update, remove) and error handling scenarios
});
```
