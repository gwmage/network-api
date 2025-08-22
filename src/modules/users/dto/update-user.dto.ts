import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString, IsBoolean, IsEnum } from 'class-validator';
import { NotificationMethod } from '../../notification/entities/notification.entity';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsOptional()
  name?: string; 

  @IsBoolean()
  @IsOptional()
  email?: boolean;

  @IsBoolean()
  @IsOptional()
  push?: boolean;

  @IsEnum(NotificationMethod)
  @IsOptional()
  preferredMethod?: NotificationMethod;
}