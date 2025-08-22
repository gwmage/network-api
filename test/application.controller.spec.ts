import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationController } from '../src/modules/application/application.controller';
import { ApplicationService } from '../src/modules/application/application.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Application } from '../src/modules/application/entities/application.entity';
import { Repository } from 'typeorm';
import { User } from '../src/modules/auth/entities/user.entity';

describe('ApplicationController', () => {
  let controller: ApplicationController;
  let service: ApplicationService;
  let applicationRepository: Repository<Application>;

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
    applicationRepository = module.get<Repository<Application>>(getRepositoryToken(Application));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
