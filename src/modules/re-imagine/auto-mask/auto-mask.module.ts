import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AutoMaskController } from './auto-mask.controller';
import { AutoMaskRepository } from './auto-mask.repository';
import { AutoMaskService } from './auto-mask.service';

@Module({
    imports: [PrismaModule, HttpModule],
    controllers: [AutoMaskController],
    providers: [AutoMaskService, AutoMaskRepository],
})
export class AutoMaskModule {}
