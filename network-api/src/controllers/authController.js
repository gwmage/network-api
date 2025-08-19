```typescript
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    // Input validation using regular expressions
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const phoneRegex = /^\d{10,11}$/; // Example: Adjust as needed

    if (!emailRegex.test(createUserDto.email)) {
      return { message: 'Invalid email format' };
    }
    if (!passwordRegex.test(createUserDto.password)) {
      return {
        message:
          'Password must be at least 8 characters long and contain at least one letter, one number, and one special character',
      };
    }
    if (!phoneRegex.test(createUserDto.phone)) { // Assuming phone is also required and validated
      return { message: 'Invalid phone number format' };
    }


    // Check for email uniqueness
    const existingUser = await this.authService.findOneByEmail(
      createUserDto.email,
    );
    if (existingUser) {
      return { message: 'Email already exists' };
    }

    // Encrypt the password
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hashedPassword;

    // Save user data to the database
    const user = await this.authService.create(createUserDto);
    delete user.password; // Remove password from the returned object for security
    return { message: 'User registered successfully', user };
  }
}

```