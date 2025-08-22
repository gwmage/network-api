import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification, NotificationMethod } from './entities/notification.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { NotificationSettingsDto } from './dto/notification-settings.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
    private usersService: UsersService, // Inject UsersService
  ) {}

  async create(createNotificationDto: CreateNotificationDto) {
    const notification = this.notificationRepository.create(createNotificationDto);
    return this.notificationRepository.save(notification);
  }

  findAll() {
    return this.notificationRepository.find();
  }

  findOne(id: number) {
    return this.notificationRepository.findOneBy({ id });
  }

  update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return this.notificationRepository.update(id, updateNotificationDto);
  }

  async updateNotificationSettings(userId: number, notificationSettingsDto: NotificationSettingsDto) {
    return this.usersService.update(userId, notificationSettingsDto); // Use UsersService to update user
  }

  remove(id: number) {
    return this.notificationRepository.delete(id);
  }
}