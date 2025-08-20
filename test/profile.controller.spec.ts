```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { ProfileController } from '../src/profile/profile.controller';
import { ProfileService } from '../src/profile/profile.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Profile } from '../src/profile/profile.entity';
import { Repository } from 'typeorm';
import { UpdateProfileDto } from '../src/profile/dto/update-profile.dto';
import { UsersService } from '../src/users/users.service';
import { User } from '../src/users/user.entity';

describe('ProfileController', () => {
  let controller: ProfileController;
  let service: ProfileService;
  let usersService: UsersService;
  let profileRepository: Repository<Profile>;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers: [
        ProfileService,
        UsersService,
        {
          provide: getRepositoryToken(Profile),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<ProfileController>(ProfileController);
    service = module.get<ProfileService>(ProfileService);
    usersService = module.get<UsersService>(UsersService);
    profileRepository = module.get<Repository<Profile>>(getRepositoryToken(Profile));
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('update', () => {
    it('should update user profile', async () => {
      const updateProfileDto: UpdateProfileDto = {
        name: 'Test User',
        bio: 'Test Bio',
        interests: ['Test Interest'],
      };
      const user = new User();
      user.id = 1;
      const profile = new Profile();
      profile.user = user;

      jest.spyOn(usersService, 'findOne').mockResolvedValue(user);
      jest.spyOn(service, 'update').mockResolvedValue(profile);


      const result = await controller.update(1, updateProfileDto);
      expect(result).toEqual(profile);

      expect(usersService.findOne).toHaveBeenCalledWith(1);
      expect(service.update).toHaveBeenCalledWith(user, updateProfileDto)
    });
  });
});
```