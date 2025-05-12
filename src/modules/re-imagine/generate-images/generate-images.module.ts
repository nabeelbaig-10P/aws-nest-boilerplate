import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GenerateImagesController } from './generate-images.controller';
import { GenerateImagesRepository } from './generate-images.repository';
import { GenerateImagesService } from './generate-images.service';

@Module({
    imports: [PrismaModule, HttpModule],
    controllers: [GenerateImagesController],
    providers: [GenerateImagesService, GenerateImagesRepository],
})
export class GenerateImagesModule {}
