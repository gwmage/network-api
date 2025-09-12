import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Main Screen Endpoints (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET) - Check server status', () => {
    return request(app.getHttpServer())
      .get('/') // Replace with an actual endpoint if the root path isn't relevant.
      .expect(200)
      .expect('Hello World!'); // Replace with the expected response for your main screen endpoint
  });


  // Add more tests for other main screen endpoints
  // Example:
  /*
  it('/users (GET) - Retrieves user data', () => {
    return request(app.getHttpServer())
      .get('/users')  // Example endpoint - replace with your actual endpoint
      .expect(200)
      .expect(res => {
        // Check specific data in the response
        expect(res.body).toBeDefined();
        // Example: expect(res.body.length).toBeGreaterThan(0);
      });
  });
  */

  afterAll(async () => {
    await app.close();
  });

});