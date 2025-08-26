```typescript
import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { validate } from 'class-validator';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async register(registerDto: RegisterDto) {
    // 1. Validate the DTO
    const validationErrors = await validate(registerDto);
    if (validationErrors.length > 0) {
      return {
        status: 'error',
        message: 'Validation failed',
        errors: validationErrors,
      };
    }

    const { password, email } = registerDto;

    // 2. Check for email uniqueness
    const existingUser = await this.usersService.findOneByEmail(email);
    if (existingUser) {
      return {
        status: 'error',
        message: 'Email already exists',
      };
    }

    // 3. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create a new user entity and save it
    const user = await this.usersService.create({
      ...registerDto,
      password: hashedPassword,
    });

    return {
      status: 'success',
      message: 'User registered successfully',
      userId: user.id,
    };
  }
}
```