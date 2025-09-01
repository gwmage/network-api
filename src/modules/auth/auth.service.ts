```typescript
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { PasswordRecoveryDto } from './dto/password-recovery.dto'; // Import DTO
import { v4 as uuidv4 } from 'uuid'; // For token generation


@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findOneBy({ email: registerDto.email });

    if (existingUser) {
      return {
        status: 'error',
        message: 'Email already exists',
      };
    }


    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const newUser = await this.usersService.create({
      ...registerDto,
      password: hashedPassword,
    });

    return {
      status: 'success',
      message: 'User registered successfully',
      userId: newUser.id,
    };
  }

  async passwordRecovery(passwordRecoveryDto: PasswordRecoveryDto) {
    const user = await this.usersService.findOneBy({ email: passwordRecoveryDto.email });

    if (!user) {
      return {
        status: 'error',
        message: 'Email not found',
      };
    }

    const token = uuidv4();

    // In a real application, store the token securely (e.g., in a database)
    // Here, we'll just simulate storing it in the user object for demonstration.
    user.passwordResetToken = token;
    await this.usersService.update(user.id, user);


    const resetLink = `https://your-frontend-domain.com/reset-password/${token}`; // Replace with your frontend URL

    // Send password reset email (using a service like Nodemailer or SendGrid)
    // Example (using a hypothetical emailService):
    // await this.emailService.sendPasswordResetEmail(user.email, resetLink);


    return {
      status: 'success',
      message: 'Password reset email sent',
    };
  }
}

```