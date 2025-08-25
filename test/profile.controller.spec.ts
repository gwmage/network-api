```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { ProfileController } from '../src/modules/profile/profile.controller';
import { ProfileService } from '../src/modules/profile/profile.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Profile } from '../src/modules/profile/entities/profile.entity';
import { Repository } from 'typeorm';
import { UpdateProfileDto } from '../src/modules/profile/dto/update-profile.dto';
import { UsersService } from '../src/modules/users/users.service';
import { User } from '../src/modules/auth/entities/user.entity';
import { CreateProfileDto } from '../src/modules/profile/dto/create-profile.dto';
import { NotFoundException } from '@nestjs/common';

describe('ProfileController', () => {
  let controller: ProfileController;
  let service: ProfileService;
  let usersService: UsersService;

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
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  describe('create', () => {
    it('should create a profile', async () => {
      const createProfileDto: CreateProfileDto = { name: 'Test User', bio: 'Test Bio', interests: ['Test Interest'] };
      const user = new User(); user.id = 1;
      const profile = new Profile(); profile.user = user;

      jest.spyOn(usersService, 'findOne').mockResolvedValue(user);
      jest.spyOn(service, 'createProfile').mockResolvedValue(profile);

      const result = await controller.create(1, createProfileDto);
      expect(result).toEqual(profile);
      expect(usersService.findOne).toHaveBeenCalledWith(1);
      expect(service.createProfile).toHaveBeenCalledWith(user, createProfileDto);

    });
  });

  describe('findOne', () => {
    it('should return a profile', async () => {
      const userId = 1;
      const user = new User(); user.id = userId;
      const profile = new Profile(); profile.user = user;
      jest.spyOn(usersService, 'findOne').mockResolvedValue(user);
      jest.spyOn(service, 'findOne').mockResolvedValue(profile);
      const result = await controller.findOne(userId);
      expect(result).toEqual(profile);
    });

    it('should throw NotFoundException if profile not found', async () => {
      const userId = 1;
      jest.spyOn(usersService, 'findOne').mockResolvedValue(null); // Simulate user not found
      await expect(controller.findOne(userId)).rejects.toThrow(NotFoundException);
    });


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
      expect(service.update).toHaveBeenCalledWith(user, updateProfileDto);
    });
  });
});

```