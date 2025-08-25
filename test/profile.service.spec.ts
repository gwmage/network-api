```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { ProfileService } from '../src/profile/profile.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Profile } from '../src/profile/profile.entity';
import { Repository } from 'typeorm';
import { User } from '../src/users/user.entity';

describe('ProfileService', () => {
  let service: ProfileService;
  let profileRepository: Repository<Profile>;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfileService,
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

    service = module.get<ProfileService>(ProfileService);
    profileRepository = module.get<Repository<Profile>>(getRepositoryToken(Profile));
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createProfile', () => {
    it('should create a new profile', async () => {
      const user = new User();
      user.id = 1;

      const createProfileDto = {
        name: 'Test User',
        bio: 'Test bio',
        interests: ['reading', 'coding']
      };

      const createdProfile = new Profile();
      createdProfile.name = createProfileDto.name;
      createdProfile.bio = createProfileDto.bio;
      createdProfile.interests = createProfileDto.interests;
      createdProfile.user = user;

      jest.spyOn(profileRepository, 'save').mockResolvedValue(createdProfile);

      const result = await service.createProfile(user, createProfileDto);

      expect(result).toEqual(createdProfile);
      expect(profileRepository.save).toHaveBeenCalledWith(expect.objectContaining(createProfileDto));
    });
  });

  describe('getProfile', () => {
    it('should retrieve a profile by user ID', async () => {
      const user = new User();
      user.id = 1;
      const existingProfile = new Profile();
      existingProfile.user = user;
      existingProfile.name = 'Test User';
      existingProfile.bio = 'Test Bio';

      jest.spyOn(profileRepository, 'findOne').mockResolvedValue(existingProfile);

      const result = await service.getProfile(user);

      expect(result).toEqual(existingProfile);
      expect(profileRepository.findOne).toHaveBeenCalledWith({ where: { user: { id: user.id } }, relations: ['user'] });
    });
  });


  describe('updateProfile', () => {
    it('should update an existing profile', async () => {
      const user = new User();
      user.id = 1;

      const updateProfileDto = {
        name: 'Updated Name',
        bio: 'Updated Bio',
        interests: ['hiking']
      };

      const existingProfile = new Profile();
      existingProfile.name = 'Test User';
      existingProfile.bio = 'Test Bio';
      existingProfile.user = user;


      jest.spyOn(profileRepository, 'findOne').mockResolvedValue(existingProfile);
      jest.spyOn(profileRepository, 'save').mockResolvedValue({ ...existingProfile, ...updateProfileDto });

      const result = await service.updateProfile(user, updateProfileDto);

      expect(result.name).toEqual(updateProfileDto.name);
      expect(result.bio).toEqual(updateProfileDto.bio);
      expect(result.interests).toEqual(updateProfileDto.interests);

    });
  });
});

```