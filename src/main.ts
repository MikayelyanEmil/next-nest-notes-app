import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  const cors = configService.get('FRONTEND_URL');
  app.enableCors({origin: cors});
  app.use(cookieParser());
  await app.listen(port || 3001);
}
bootstrap(); 
