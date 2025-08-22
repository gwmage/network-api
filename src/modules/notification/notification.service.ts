import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { NotificationPreferencesDto } from './dto/notification-preferences.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
    private usersService: UsersService
  ) {}

  async create(user, createNotificationDto: CreateNotificationDto) {
    const newNotification = this.notificationRepository.create(createNotificationDto);
    newNotification.user = user;
    return this.notificationRepository.save(newNotification);
  }

  async findAll(user) {
    return this.notificationRepository.find({ where: { user: { id: user.id } } });
  }

  async findOne(id: number) {
    const notification = await this.notificationRepository.findOne({ where: { id } });
    if (!notification) {
      throw new NotFoundException(`Notification with ID ${id} not found`);
    }
    return notification;
  }

  async update(id: number, updateNotificationDto: UpdateNotificationDto) {
    const notification = await this.findOne(id);
    this.notificationRepository.merge(notification, updateNotificationDto);
    return this.notificationRepository.save(notification);
  }

  async remove(id: number) {
    const notification = await this.findOne(id);
    return this.notificationRepository.remove(notification);
  }

  async updatePreferences(user, notificationPreferencesDto: NotificationPreferencesDto) {
    const updatedUser = await this.usersService.update(user.id, notificationPreferencesDto); 
    return updatedUser;
  }
}
