import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../src/modules/auth/auth.controller';
import { AuthService } from '../src/modules/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/modules/auth/entities/user.entity';
import { UserRepository } from '../src/modules/auth/user.repository';
import { MailerModule } from '@nestjs-modules/mailer';


describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        JwtModule.register({
          secret: 'test_secret', // Replace with a real secret for production
          signOptions: { expiresIn: '1d' },
        }),
        MailerModule.forRoot({
          transport: {
            host: 'smtp.example.com', // Replace with your SMTP host
            port: 587, // Replace with your SMTP port
            secure: false, // Set to true if using SSL
            auth: {
              user: 'user@example.com', // Replace with your SMTP username
              pass: 'password', // Replace with your SMTP password
            },
          },
          defaults: {
            from: '"No Reply" <noreply@example.com>', // Replace with your default sender email
          },
         }),
      ],
      controllers: [AuthController],
      providers: [
        AuthService,
        UserRepository,
        {
          provide: getRepositoryToken(User),
          useValue: {}, // Mock the repository
        },


      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Add more tests for login, register, forgot password etc. here.  See examples below.
  describe('login', () => {
    it('should return an access token on successful login', async () => {
      const mockLoginDto = { email: 'test@example.com', password: 'TestPassword123$' };
      const mockUser = { id: 1, name: 'Test User', email: 'test@example.com' };
      const mockAccessToken = 'mock_access_token';

      jest.spyOn(service, 'login').mockResolvedValue({ accessToken: mockAccessToken, user: mockUser });


      const result = await controller.login(mockLoginDto);

      expect(result.accessToken).toBe(mockAccessToken);
      expect(result.user).toEqual(mockUser);

    });


    it('should throw an Unauthorized exception for invalid credentials', async () => {

        const mockLoginDto = { email: 'test@example.com', password: 'wrong_password' };
        jest.spyOn(service, 'login').mockRejectedValue(new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED));


        await expect(controller.login(mockLoginDto)).rejects.toThrow(HttpException);
    });
  });
});