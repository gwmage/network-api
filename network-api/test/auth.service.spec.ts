import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../src/modules/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/modules/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { UserRepository } from '../src/modules/auth/user.repository';
import * as bcrypt from 'bcrypt';
import { MailerModule } from '@nestjs-modules/mailer';


describe('AuthService', () => {
  let service: AuthService;
  let userRepository: Repository<User>;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        JwtModule.registerAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            secret: configService.get<string>('JWT_SECRET'),
            signOptions: { expiresIn: '1d' },
          }),
          inject: [ConfigService],
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

      providers: [
        AuthService,
        UserRepository,

        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },


      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  describe('login', () => {
    it('should return an access token on successful login', async () => {
      const mockUser = new User();
      mockUser.id = 1;
      mockUser.email = 'test@example.com';
      mockUser.password = await bcrypt.hash('TestPassword123$', 10); // Hashed password

      jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(mockUser);

      const loginDto = { email: 'test@example.com', password: 'TestPassword123$' };
      const result = await service.login(loginDto);

      expect(result.accessToken).toBeDefined();
      expect(result.user).toBeDefined();
      expect(result.user.id).toBe(mockUser.id);
      expect(result.user.email).toBe(mockUser.email);

    });



    it('should throw an Unauthorized exception for invalid credentials (wrong password)', async () => {
      const mockUser = new User();
      mockUser.id = 1;
      mockUser.email = 'test@example.com';
      mockUser.password = await bcrypt.hash('TestPassword123$', 10);

      jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(mockUser);

      const loginDto = { email: 'test@example.com', password: 'WrongPassword' }; // Incorrect password

      await expect(service.login(loginDto)).rejects.toThrow(HttpException);



    });



    it('should throw an Unauthorized exception for invalid credentials (user not found)', async () => {
        jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(null); // User not found


        const loginDto = { email: 'nonexistent@example.com', password: 'TestPassword123$' };


        await expect(service.login(loginDto)).rejects.toThrow(HttpException);



    });



});
});

---[END_OF_FILES]---