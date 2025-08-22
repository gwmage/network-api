import { Test, TestingModule } from '@nestjs/testing';
import { ProfileController } from '../src/profile/profile.controller';
import { ProfileService } from '../src/profile/profile.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/users/user.entity';
import { Repository } from 'typeorm';
import { UpdateProfileDto } from '../src/profile/dto/update-profile.dto';
import { UsersService } from '../src/users/users.service';

describe('ProfileController', () => {
  let controller: ProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers: [
        ProfileService,
        UsersService, // Provide the UsersService
        {
          provide: getRepositoryToken(User), // Inject the User entity repository
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<ProfileController>(ProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
