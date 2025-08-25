```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from '../src/admin/admin.controller';
import { AdminService } from '../src/admin/admin.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/users/user.entity';
import { Repository } from 'typeorm';
import { UnauthorizedException } from '@nestjs/common';
import { LoginDto } from '../src/auth/dto/login.dto';
import { Match } from '../src/matches/match.entity';
import { SystemSettings } from '../src/system-settings/system-settings.entity';
import { CreateUserDto } from '../src/users/dto/create-user.dto';
import { UpdateUserDto } from '../src/users/dto/update-user.dto';
import { CreateMatchDto } from '../src/matches/dto/create-match.dto';
import { UpdateMatchDto } from '../src/matches/dto/update-match.dto';
import { UpdateSystemSettingsDto } from '../src/system-settings/dto/update-system-settings.dto';

describe('AdminController', () => {
  let controller: AdminController;
  let service: AdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [
        AdminService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Match),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(SystemSettings),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<AdminController>(AdminController);
    service = module.get<AdminService>(AdminService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Login
  it('should handle successful admin login', async () => { /* ... (Existing code) */ });
  it('should handle invalid admin credentials', async () => { /* ... (Existing code) */ });

  // User CRUD
  it('should create a user', async () => {
    const createUserDto: CreateUserDto = { /* ...data */ };
    const createdUser: User = { /* ...data */ } as User;
    jest.spyOn(service, 'createUser').mockResolvedValue(createdUser);
    expect(await controller.createUser(createUserDto)).toBe(createdUser);
  });
  // Add similar tests for getUser, updateUser, deleteUser

  // Match CRUD
  it('should create a match', async () => {
    const createMatchDto: CreateMatchDto = { /* ...data */ };
    const createdMatch: Match = { /* ...data */ } as Match;
    jest.spyOn(service, 'createMatch').mockResolvedValue(createdMatch);
    expect(await controller.createMatch(createMatchDto)).toBe(createdMatch);
  });
  // Add similar tests for getMatch, updateMatch, deleteMatch

  // System Settings
  it('should get system settings', async () => {
    const settings: SystemSettings = { /* ...data */ } as SystemSettings;
    jest.spyOn(service, 'getSystemSettings').mockResolvedValue(settings);
    expect(await controller.getSystemSettings()).toBe(settings);
  });

  it('should update system settings', async () => {
    const updateSystemSettingsDto: UpdateSystemSettingsDto = { /* ...data */ };
    const updatedSettings: SystemSettings = { /* ...data */ } as SystemSettings;
    jest.spyOn(service, 'updateSystemSettings').mockResolvedValue(updatedSettings);
    expect(await controller.updateSystemSettings(updateSystemSettingsDto)).toBe(updatedSettings);
  });

});
```