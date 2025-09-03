```typescript
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async register(registerDto: RegisterDto) {
    // 1. Input validation
    // Validation is handled by class-validator in RegisterDto

    // 2. Check for duplicate emails
    const existingUser = await this.usersService.findOneBy({ email: registerDto.email });
    if (existingUser) {
      return {
        status: 'error',
        message: 'Email already exists',
      };
    }

    // 3. Hash the password
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // 4. Create a new user entity and save it
    const newUser = await this.usersService.create({
      ...registerDto,
      password: hashedPassword,
    });

    return {
      status: 'success',
      message: 'User registered successfully',
      userId: newUser.id, // Return userId instead of the entire user object
    };
  }
}
```