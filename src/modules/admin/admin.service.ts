```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Profile } from '../profiles/entities/profile.entity';
import { Group } from '../groups/entities/group.entity';
import { SystemSettings } from './entities/system-settings.entity';
import { UpdateSystemSettingsDto } from './dto/update-system-settings.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(Group) private groupRepository: Repository<Group>,
    @InjectRepository(SystemSettings)
    private systemSettingsRepository: Repository<SystemSettings>,
  ) {}

  // ... other methods

  // System Settings
  async getSystemSettings(): Promise<SystemSettings> {
    const settings = await this.systemSettingsRepository.findOne({ where: { id: 1 } });
    if (!settings) {
      // Create default settings if none exist
      const defaultSettings = this.systemSettingsRepository.create({
        // ... default settings values
      });
      return await this.systemSettingsRepository.save(defaultSettings);
    }
    return settings;
  }

  async updateSystemSettings(
    updateSystemSettingsDto: UpdateSystemSettingsDto,
  ): Promise<SystemSettings> {
    const settings = await this.systemSettingsRepository.findOne({ where: { id: 1 } });
    if (!settings) {
      throw new Error('System settings not found.'); // Or create default settings
    }

    // Update settings based on DTO
    Object.assign(settings, updateSystemSettingsDto);

    return await this.systemSettingsRepository.save(settings);
  }
}
```