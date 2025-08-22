import { Test, TestingModule } from '@nestjs/testing';
import { ProfileController } from '../src/modules/profile/profile.controller';
import { ProfileService } from '../src/modules/profile/profile.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/modules/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateProfileDto } from '../src/modules/profile/dto/update-profile.dto';
import { UsersService } from '../src/modules/auth/auth.service';

describe('ProfileController', () => {
  let controller: ProfileController;
  let service: ProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers: [
        ProfileService,
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<ProfileController>(ProfileController);
    service = module.get<ProfileService>(ProfileService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
