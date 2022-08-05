import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as requestIp from 'request-ip';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(requestIp.mw());

  const config = new DocumentBuilder()
    .setTitle('TOPMAMA BACKEND CHALLENGE')
    .setDescription('TOPMAMA APIs list')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

    app.useGlobalPipes(
      new ValidationPipe({
        forbidUnknownValues: true,
        forbidNonWhitelisted: true,
        stopAtFirstError: true,
        transform: true,
      }),
    );

  await app.listen(9009);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
