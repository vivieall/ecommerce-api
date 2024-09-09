import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from '../src/users/users.repository';
import * as bcrypt from 'bcrypt'; // Asegúrate de importar bcrypt

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let mockUsersRepository: Partial<UsersRepository>;
  let jwtService: JwtService;
  
  const testUser = {
    email: 'test1@example.com',
    name: 'Test User 1',
    password: 'Testing12*',
    address: '404 Oak Street',
    phone: 123455667,
    country: 'Lima',
    city: 'Peru',
    isAdmin: false
  };

  beforeEach(async () => {
    mockUsersRepository = {
      findByEmail: jest.fn().mockResolvedValue(testUser), 
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(UsersRepository)
      .useValue(mockUsersRepository)  
      .compile();

    app = moduleFixture.createNestApplication();
    jwtService = moduleFixture.get<JwtService>(JwtService);

    // Mockear bcrypt.compare para devolver true siempre que se compare la contraseña
    jest.spyOn(bcrypt, 'compare').mockImplementation((password, hash) => {
      return Promise.resolve(password === 'Testing12*'); // Simula que la contraseña siempre es válida
    });

    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/auth/signin (POST) should authenticate user and return a token', () => {
    return request(app.getHttpServer())
      .post('/auth/signin')
      .send({ email: 'test1@example.com', password: 'Testing12*' })
      .expect(200)
      .expect(res => {
        expect(res.body).toHaveProperty('token');
        expect(res.body.token).toBeDefined(); 
      });
  });

  it('POST /auth/signin returns an error if the email is not found and status code 400', async () => {
    const req = await request(app.getHttpServer())
      .post('/auth/signin')
      .send({
        email: 'someemail@mail.com',
        password: 'Password123*',
      });
  
      expect(req.status).toBe(400);
  });

  describe('User Management', () => {
    it('/users (GET) should return a list of users', () => {
      return request(app.getHttpServer())
        .get('/users')
        .set('Authorization', `Bearer user-token-notadmin`)
        .expect(401);
    });
  });

  afterEach(async () => {
    await app.close();
  });

});