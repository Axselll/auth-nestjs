import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv'
import * as passport from 'passport'
const session = require('cookie-session');
dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'https://itusdh.space',
    credentials: true
  });
  app.use(session({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.SECRET_KEY],
    sameSite: 'none',
    domain: 'itusdh.space'
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  await app.listen(process.env.PORT || 3001);
}
bootstrap();
