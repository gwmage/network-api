import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationController } from '../src/modules/application/application.controller';
import { ApplicationService } from '../src/modules/application/application.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Application } from '../src/modules/application/entities/application.entity';
import { Repository } from 'typeorm';
import { User } from '../src/modules/auth/entities/user.entity';
import { UsersService } from '../src/modules/auth/auth.service';

describe('ApplicationController', () => {
  let controller: ApplicationController;
  let service: ApplicationService;
  let userRepository: Repository<User>;

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
          useClass: Repository
        }
      ],
    }).compile();

    controller = module.get<ApplicationController>(ApplicationController);
    service = module.get<ApplicationService>(ApplicationService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
