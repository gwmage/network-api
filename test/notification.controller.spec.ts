import { Test, TestingModule } from '@nestjs/testing';
import { NotificationController } from '../src/notification/notification.controller';
import { NotificationService } from '../src/notification/notification.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Notification } from '../src/notification/notification.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../src/users/users.service';
import { User } from '../src/users/user.entity';

describe('NotificationController', () => {
  let controller: NotificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationController],
      providers: [
        NotificationService,
        UsersService, // Added UsersService to providers
        {
          provide: getRepositoryToken(Notification),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(User), // Added User repository token
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
