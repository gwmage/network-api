```typescript
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersRepository: UsersRepository) {}

  async register(createUserDto: CreateUserDto) {
    const { email, password, ...otherData } = createUserDto;

    const existingUser = await this.usersRepository.findOneBy({ email });
    if (existingUser) {
      throw new Error('Email already exists.'); // Or a custom exception
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const newUser = await this.usersRepository.save({
        email,
        password: hashedPassword,
        ...otherData,
      });
      return newUser;
    } catch (error) {
      // Handle database errors appropriately, e.g., log and rethrow
      throw new Error('Failed to register user.');
    }
  }
}
```