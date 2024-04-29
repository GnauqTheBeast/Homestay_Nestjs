import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './shareEntire/exception-filter/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter)

  const config = new DocumentBuilder()
    .setTitle('Homestay')
    .setDescription('The Homestay description')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      name: 'Authorization', 
      in: 'header', 
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document)

  await app.listen(process.env.API_PORT);
}
bootstrap();
