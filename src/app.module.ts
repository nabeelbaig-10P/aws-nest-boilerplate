import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import { ZodValidationPipe } from 'nestjs-zod';
import configuration from '../config';
import { CustomResponseMiddleware } from './common/middleware/response';
import { winstonLogger } from './common/utils/winston-logger';
import { PrismaModule } from './prisma/prisma.module';
import {
    AuthenticationModule,
    GoogleMapsModule,
    ReImagineModule,
    UsersModule,
    WebhookModule,
} from './modules';

@Module({
    providers: [
        {
            provide: APP_PIPE,
            useClass: ZodValidationPipe,
        },
    ],
    imports: [
        PrismaModule,
        ConfigModule.forRoot({
            cache: true,
            isGlobal: true,
            load: [configuration],
        }),
        WinstonModule.forRoot({
            instance: winstonLogger,
            transports: winstonLogger.transports,
        }),
        UsersModule,
        WebhookModule,
        AuthenticationModule,
        ReImagineModule,
        GoogleMapsModule,
    ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer
            .apply(CustomResponseMiddleware)
            .forRoutes({ path: '{*splat}', method: RequestMethod.ALL });
    }
}
