import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome Url Short');
  });

  it('/ (GET :hash)', async () => {
    let hash: string;

    const postResponse = await request(app.getHttpServer())
      .post('/url')
      .send({ link: "https://teddydigital.io/sobre/" })
      .set('Accept', 'application/json');

    const fullUrl: string = postResponse.text;
    hash = fullUrl.split('/').pop()

    const getResponse = await request(app.getHttpServer())
      .get(`/${hash}`)
      .expect(302)
      .redirects(0);
    expect(getResponse.headers.location).toBe('https://teddydigital.io/sobre/');
  });

  it('/ (GET :hash) redirect to path localhost', async () => {
    const getResponse = await request(app.getHttpServer())
      .get(`/1111`)
      .expect(302)
      .redirects(0);
    expect(getResponse.headers.location).toBe(process.env.HOSTNAME_PATH);
  });

  it('/ (POST /url)', async () => {
    const postResponse = await request(app.getHttpServer())
      .post('/url')
      .send({ link: "https://teddydigital.io/sobre/" })
      .set('Accept', 'application/json')
      .expect(201);

    expect(postResponse.text).toContain(process.env.HOSTNAME_PATH)
  });

  it('/ (POST /url)', async () => {
    const postResponse = await request(app.getHttpServer())
      .post('/url')
      .send({ link: "https://teddydigital.io/sobre/" })
      .set('Accept', 'application/json')
      .expect(201);

    expect(postResponse.text).toContain(process.env.HOSTNAME_PATH)
  });

  it.each([
    "",
    { link: 'khjkjh' }
  ])('/ (POST /url) return error body invalid  with %s', async (link) => {
    const postResponse = await request(app.getHttpServer())
      .post('/url')
      .send(link)
      .set('Accept', 'application/json')
      .expect(400);

    expect(postResponse.body.error).toEqual("Bad Request")
  });

  it('/ (POST /user)', async () => {
    const username = `teddy${Math.floor(Math.random() * 1000)}`
    const postResponse = await request(app.getHttpServer())
      .post('/user')
      .send({
        username: username,
        password: "123456",
        name: "teddy"
      })
      .set('Accept', 'application/json')
      .expect(201);

    expect(postResponse.body.username).toEqual(username)
  });

  it.each([
    "",
    { username: "testeUsername" },
    { password: "testeusername" },
    { username: "123", password: "123456" },
    { username: "teddy", password: "123456" },
    { username: "teddyteste", password: "12346" },
  ])('/ (POST /user) return error body invalid  with %s', async (user) => {
    const postResponse = await request(app.getHttpServer())
      .post('/user')
      .send(user)
      .set('Accept', 'application/json')
      .expect(400);

    expect(postResponse.body.error).toEqual("Bad Request")
  });

  it('/ (POST /login)', async () => {
    const username = `teddy${Math.floor(Math.random() * 1000)}`
    const responseUser = await request(app.getHttpServer())
      .post('/user')
      .send({
        username: username,
        password: "123456",
        name: "teddy"
      })
      .set('Accept', 'application/json')


    const postResponse = await request(app.getHttpServer())
      .post('/login')
      .send({
        username: username,
        password: "123456",
      })
      .set('Accept', 'application/json')
      .expect(201)

    expect(typeof postResponse.body.token).toBe('string');
  });


  it('/ (POST /login) return error credentials', async () => {
    const username = `teddy${Math.floor(Math.random() * 1000)}`
    await request(app.getHttpServer())
      .post('/user')
      .send({
        username: username,
        password: "123456",
        name: "teddy"
      })
      .set('Accept', 'application/json')


    const postResponse = await request(app.getHttpServer())
      .post('/login')
      .send({
        username: username,
        password: "258484",
      })
      .set('Accept', 'application/json')
      .expect(401)

    expect(postResponse.body.message).toBe("Credentials invalids!");
  });

  it.each([
    "",
    { username: "testeUsername" },
    { password: "testeusername" },
  ])('/ (POST /login) return error body invalid  with %s', async (user) => {
    const postResponse = await request(app.getHttpServer())
      .post('/login')
      .send(user)
      .set('Accept', 'application/json')
      .expect(400);

    expect(postResponse.body.error).toEqual("Bad Request")
  });

  it('/ (GET /links)', async () => {
    const username = `teddy${Math.floor(Math.random() * 1000)}`
    await request(app.getHttpServer())
      .post('/user')
      .send({
        username: username,
        password: "123456",
        name: "teddy"
      })
      .set('Accept', 'application/json')


    const responseLogin = await request(app.getHttpServer())
      .post('/login')
      .send({
        username: username,
        password: "123456",
      })
      .set('Accept', 'application/json')
      .expect(201)

      const token = responseLogin.body.token

      await request(app.getHttpServer())
      .post('/url')
      .set('Authorization', `Bearer ${token}`)
      .send({ link: "https://teddydigital.io/sobre/" })
      .set('Accept', 'application/json')

      const getResponse = await request(app.getHttpServer())
      .get('/links')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect(200)

      expect(getResponse.body[0].link).toBe("https://teddydigital.io/sobre/")
  });

  it('/ (GET /links) return error Unauthorized', async () => {
    const getResponse = await request(app.getHttpServer())
      .get(`/links`)
      .expect(401);
    expect(getResponse.body.message).toBe("Unauthorized");
  });
});
