import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '../users/entities/user.entity';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendWelcomeEmail(user: User): Promise<void> {
    const { email, name } = user;
    await this.mailerService.sendMail({
      to: email,
      subject: 'Welcome to Our Platform!',
      html: `<h1>Welcome, ${name}!</h1><p>Thank you for signing up.</p>`,
    });
  }
}