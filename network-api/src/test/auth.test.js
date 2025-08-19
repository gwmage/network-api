```typescript
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';
import { mockedUser, mockUserCreateDto } from './mocks';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let authService: AuthService;
  let usersService: UsersService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(UsersService)
      .useValue({
        create: jest.fn().mockResolvedValue(mockedUser),
        findOneByEmail: jest.fn(),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    authService = moduleFixture.get<AuthService>(AuthService);
    usersService = moduleFixture.get<UsersService>(UsersService);
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/register (POST) - Success', async () => {
    const response = await request(app.getHttpServer())
      .post('/register')
      .send(mockUserCreateDto)
      .expect(201);

    expect(usersService.create).toHaveBeenCalledWith(mockUserCreateDto);
    expect(response.body).toEqual({
      message: 'User registered successfully',
      user: mockedUser,
    });
  });

  it('/register (POST) - Validation Error', async () => {
    const invalidDto = { ...mockUserCreateDto };
    delete invalidDto.email;

    await request(app.getHttpServer())
      .post('/register')
      .send(invalidDto)
      .expect(400);
  });


  it('/register (POST) - Duplicate Email', async () => {
    jest.spyOn(usersService, 'findOneByEmail').mockResolvedValue(mockedUser);
    await request(app.getHttpServer())
      .post('/register')
      .send(mockUserCreateDto)
      .expect(400)
      .expect({
        statusCode: 400,
        message: 'Email already exists',
        error: 'Bad Request'
      });
  });

  it('/register (POST) - Database Error', async () => {

    jest.spyOn(usersService, 'create').mockRejectedValue(new Error('Database error'));
    const response = await request(app.getHttpServer())
    .post('/register')
    .send(mockUserCreateDto)
    .expect(500);

    expect(response.body).toEqual({
      statusCode: 500,
      message: 'Database error'
    });
  });

});

```