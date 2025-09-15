import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import request from 'supertest';
import { MikroORM } from '@mikro-orm/core';
import { Flower } from '../src/flowers/entities/flowers.entity';

describe('FlowersController (e2e)', () => {
  let app: INestApplication;
  let orm: MikroORM;

  beforeAll(async () => {
    const moduleMixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleMixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    orm = app.get(MikroORM);
    await orm.getSchemaGenerator().refreshDatabase();

    // Seed test data
    const em = orm.em.fork();
    const flower1 = em.create(Flower, { name: 'Lutik', color: 'Red', price: 10 });
    const flower2 = em.create(Flower, { name: 'Geralt', color: 'White', price: 100 });
    const flower3 = em.create(Flower, { name: 'Triss', color: 'Firered', price: 1000 });
    await em.persistAndFlush([flower1, flower2, flower3]);
  });

  it('/flowers (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/flowers')
      .expect(200);

    expect(response.body).toHaveLength(3);
    expect(response.body[0]).toMatchObject({
      id: 1,
      name: 'Lutik',
      color: 'Red',
      price: 10,
    });
    expect(response.body[0]).toHaveProperty('createdAt');
    expect(response.body[0]).toHaveProperty('updatedAt');
    expect(response.body[1]).toMatchObject({
      id: 2,
      name: 'Geralt',
      color: 'White',
      price: 100,
    });
    expect(response.body[2]).toMatchObject({
      id: 3,
      name: 'Triss',
      color: 'Firered',
      price: 1000,
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
