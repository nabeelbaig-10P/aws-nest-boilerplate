import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { patchNestJsSwagger } from 'nestjs-zod';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/error.filter';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule, { cors: true });
    const config = app.get(ConfigService);

    app.setGlobalPrefix('api/v1');
    patchNestJsSwagger();

    const conf = new DocumentBuilder()
        .setTitle('Landscape AI - API')
        .setDescription('Landscape AI Platform API 1.0')
        .setVersion('0.1')
        .addBearerAuth({
            description: `Please enter token in following format: Bearer <JWT>`,
            name: 'Authorization',
            bearerFormat: 'Bearer',
            scheme: 'Bearer',
            type: 'http',
            in: 'Header',
        })
        .build();

    const document = SwaggerModule.createDocument(app, conf);
    SwaggerModule.setup('api/v1/docs', app, document);

    const httpAdapter = app.get(HttpAdapterHost);
    app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

    await app.listen(config.get<number>('port') ?? 80);
}

bootstrap().catch((err) => {
    console.error('Application failed to start:', err);
    process.exit(1);
});
