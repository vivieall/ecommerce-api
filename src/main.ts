import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middleware-logger/middleware-logger.middleware';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
  .setTitle('PI M4 backend API')
  .setDescription(
    'This is an API for the PI M4 project of the backend module of the fullstack bootcamp of Henry.',
  )
  .setVersion('1.0')
  .addBearerAuth()
  .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  app.use(loggerGlobal);
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000);
}
bootstrap();
