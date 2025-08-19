```typescript
import * as mongoose from 'mongoose';
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
});

export interface User extends mongoose.Document {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
}

export class UserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(8)
  @Matches(/^(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).+$/, { message: 'Password must contain at least one letter and one special character' })
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;
}


export const User = mongoose.model<User>('User', UserSchema);

```