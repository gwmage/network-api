```typescript
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ConflictException } from '@nestjs/common';


@Injectable()
export class AuthRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(user: any) {
    try {
      const existingUser = await this.findOne({ where: { email: user.email } });

      if (existingUser) {
        return { status: 'error', message: 'Email already exists' };
      }

      const newUser = this.create(user);
      return { status: 'success', user: await this.save(newUser) };
    } catch (error) {
      if (error.code === '23505') { // Unique violation error code in PostgreSQL
        return { status: 'error', message: 'Email already exists' };
      }
      console.error('Error creating user:', error); 
      return { status: 'error', message: 'Failed to create user', errors: error };
    }
  }
}
```