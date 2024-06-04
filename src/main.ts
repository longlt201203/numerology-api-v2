import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Env } from '@utils';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: "*" })

  const config = new DocumentBuilder()
    .setTitle('Numerology API')
    .setDescription('Numerology API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(Env.LISTEN_PORT);
}
bootstrap();
