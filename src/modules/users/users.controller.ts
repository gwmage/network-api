```typescript
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/role.enum';
import { NotificationPreferencesDto } from './dto/notification-preferences.dto';
import { FindUsersQueryDto } from './dto/find-users-query.dto'; // Import DTO

@Controller('admin/users')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin)
export class UserController {
  constructor(private readonly userService: UsersService) {}

  // ... (Existing code remains unchanged)

  @Get('filter')
  async findUsers(@Query() query: FindUsersQueryDto) {
    return this.userService.findUsers(query);
  }

  @Get(':id/notifications')
  getNotificationPreferences(@Param('id', ParseIntPipe) id: number): Promise<NotificationPreferencesDto> {
    return this.userService.getNotificationPreferences(id);
  }

  @Put(':id/notifications')
  updateNotificationPreferences(
    @Param('id', ParseIntPipe) id: number,
    @Body() notificationPreferencesDto: NotificationPreferencesDto,
  ): Promise<void> {
    return this.userService.updateNotificationPreferences(id, notificationPreferencesDto);
  }
}

```