```typescript
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Put,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UsersService } from '../user/user.service';
import { UpdateUserDto } from '../user/dto/update-user.dto';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async findAll(@Req() req: Request) {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new UnauthorizedException({ message: 'User not found' });
    }

    return user;
  }


  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: Request,
  ) {
    // Check if the authenticated user is authorized to update this user.
    // Usually, this means checking if the authenticated user ID matches the ID of the user being updated.
    // You'll likely need to add a 'user' property to the Request object in your AuthGuard.
    const reqUser = req.user;
    if(reqUser.id !== id && !reqUser.isAdmin) { // Example authorization check. Adjust as needed.
      throw new UnauthorizedException('You are not authorized to update this user.');
    }

    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
     // Similar authorization check as in the update method
    const reqUser = req.user;
    if(reqUser.id !== id && !reqUser.isAdmin) { // Example authorization check. Adjust as needed.
      throw new UnauthorizedException('You are not authorized to delete this user.');
    }
    return this.userService.remove(id);
  }


  @Get(':id/activity')
  async findUserActivity(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    return this.userService.findUserActivity(id);
  }
}

```