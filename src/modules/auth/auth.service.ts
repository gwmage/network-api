import {
  Injectable,
  ConflictException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { EmailService } from '../email/email.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly emailService: EmailService,
  ) {}

  async signUp(signupDto: SignupDto): Promise<Omit<User, 'password'>> {
    const { email, password, name, contact } = signupDto;

    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('An account with this email already exists.');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await this.usersService.createUser({
      email,
      password: hashedPassword,
      name,
      contact,
    });

    await this.emailService.sendWelcomeEmail(newUser);

    const { password: _, ...result } = newUser;
    return result;
  }

  async validateSocialUser(provider: string, profile: any): Promise<User> {
    const email =
      profile.emails?.[0]?.value || profile._json?.kakao_account?.email;
    if (!email) {
      throw new ConflictException('Email not provided by social provider.');
    }

    let user = await this.usersService.findByEmail(email);

    if (user) {
      if (!user.provider) {
        // User exists with local password, link account
        user.provider = provider;
        user.providerId = profile.id;
        await this.usersService.createUser(user); // this is effectively an update
      } else if (user.provider !== provider) {
        throw new ConflictException(
          'User is already registered with another provider.',
        );
      }
      return user;
    }

    // If user does not exist, create a new one.
    const newUser = await this.usersService.createUser({
      email,
      name: profile.displayName,
      provider,
      providerId: profile.id,
    });

    await this.emailService.sendWelcomeEmail(newUser);

    return newUser;
  }
}