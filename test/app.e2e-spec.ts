import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Controllers (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/health-check (POST)', () => {
    return request(app.getHttpServer())
      .post('/health-check')
      .expect(200)
      .expect('OK');
  });

  it('/articles (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/articles')
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
  });
});
