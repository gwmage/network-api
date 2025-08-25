```typescript
import { Controller, Get, Put, Body } from '@nestjs/common';
import { AdminService } from './admin.service';
import { SystemSettingsDto } from './dto/system-settings.dto';
import { SystemSettings } from './entities/system-settings.entity';
import { UpdateSystemSettingsDto } from './dto/update-system-settings.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('settings')
  async getSystemSettings(): Promise<SystemSettings> {
    return this.adminService.getSystemSettings();
  }

  @Put('settings')
  async updateSystemSettings(@Body() settings: UpdateSystemSettingsDto) {
    return this.adminService.updateSystemSettings(settings);
  }
}

```