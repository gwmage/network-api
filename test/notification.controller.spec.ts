import { Test, TestingModule } from '@nestjs/testing';
import { NotificationController } from '../src/modules/notification/notification.controller';
import { NotificationService } from '../src/modules/notification/notification.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Notification } from '../src/modules/notification/entities/notification.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../src/modules/auth/auth.service';
import { User } from '../src/modules/auth/entities/user.entity';

describe('NotificationController', () => {
  let controller: NotificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationController],
      providers: [
        NotificationService,
        UsersService,
        {
          provide: getRepositoryToken(Notification),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<NotificationController>(NotificationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
