import { Test, TestingModule } from '@nestjs/testing';
import { ProfileController } from '../src/modules/profile/profile.controller';
import { ProfileService } from '../src/modules/profile/profile.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Profile } from '../src/modules/profile/entities/profile.entity';
import { Repository } from 'typeorm';
import { CreateProfileDto } from '../src/modules/profile/dto/create-profile.dto';
import { UpdateProfileDto } from '../src/modules/profile/dto/update-profile.dto';

describe('ProfileController', () => {
  let controller: ProfileController;
  let service: ProfileService;
  let profileRepository: Repository<Profile>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers: [
        ProfileService,
        {
          provide: getRepositoryToken(Profile),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<ProfileController>(ProfileController);
    service = module.get<ProfileService>(ProfileService);
    profileRepository = module.get<Repository<Profile>>(getRepositoryToken(Profile));
  });

it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Add more tests for controller methods
});
