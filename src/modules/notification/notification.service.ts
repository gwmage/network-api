import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { User } from '../auth/entities/user.entity';
import { NotificationPreferences } from './entities/notification-preferences.entity';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(NotificationPreferences)
    private readonly notificationPreferencesRepository: Repository<NotificationPreferences>
  ) {}

  async createNotification(createNotificationDto: CreateNotificationDto, user: User): Promise<Notification> {
    this.logger.log('Creating notification:', createNotificationDto);
    try {
      const newNotification = this.notificationRepository.create({
        ...createNotificationDto,
        user,
      });
      return await this.notificationRepository.save(newNotification);
    } catch (error) {
      this.logger.error('Error creating notification:', error);
      throw error;
    }
  }

  // ... other methods ...
}
