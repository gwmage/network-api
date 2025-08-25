```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { Profile } from '../profile/profile.entity';
import { Group } from '../group/group.entity';
import { SystemSettings } from './system-settings.entity';
import { UpdateSystemSettingsDto } from './dto/system-settings.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(Group) private groupRepository: Repository<Group>,
    @InjectRepository(SystemSettings) private systemSettingsRepository: Repository<SystemSettings>,
  ) {}

  // ... other methods

  // System Settings
  async getSystemSettings(): Promise<SystemSettings> {
    const settings = await this.systemSettingsRepository.findOne({ where: { id: 1 } });
    if (!settings) {
      // Create default settings if none exist
      const defaultSettings = this.systemSettingsRepository.create({
        appName: 'Default App Name',
        appUrl: 'http://localhost:3000',
        // ... other default values
      });
      return this.systemSettingsRepository.save(defaultSettings);
    }
    return settings;
  }

  async updateSystemSettings(settings: UpdateSystemSettingsDto): Promise<SystemSettings> {
    await this.systemSettingsRepository.update(1, settings);
    return this.systemSettingsRepository.findOneBy({ id: 1 });
  }
}

```