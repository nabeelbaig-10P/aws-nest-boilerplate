import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from '../users/users.module';
import { WebhookController } from './webhooks.controller';

@Module({
    imports: [PrismaModule, UsersModule],
    controllers: [WebhookController],
})
export class WebhookModule {}
