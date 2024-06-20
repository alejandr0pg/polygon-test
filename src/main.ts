import { NestFactory } from '@nestjs/core';
import serverlessExpress from '@codegenie/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

let server: Handler;

async function bootstrap(): Promise<Handler> {
  const app = await NestFactory.create(AppModule);
  // validator
  app.useGlobalPipes(new ValidationPipe());

  // swagger config document
  const config = new DocumentBuilder()
    .setTitle('NestJS Serverless Marketplace')
    .setDescription(
      'REST API NestJS x Prisma for marketplace example of polygon test',
    )
    .setVersion('1.0')
    .addTag('Example')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('openapi', app, document);

  // Inciamos la app
  await app.init();

  // retornamos la instacia del serverless
  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};
