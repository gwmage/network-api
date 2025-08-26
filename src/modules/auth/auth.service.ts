```typescript
import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async register(registerDto: RegisterDto) {
    const { password, email } = registerDto;

    const existingUser = await this.usersService.findOneByEmail(email);
    if (existingUser) {
      return {
        status: 'error',
        message: 'Email already exists',
      };
    }


    const hashedPassword = await bcrypt.hash(password, 10);

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