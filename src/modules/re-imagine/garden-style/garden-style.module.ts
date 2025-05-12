import { Module } from '@nestjs/common';
import { GardenStyleController } from './garden-style.controller';
import { GardenStyleService } from './garden-style.service';
import { GardenStyleRepository } from './garden-style.repository';
import { PrismaService } from '../../../prisma/prisma.service';

@Module({
    controllers: [GardenStyleController],
    providers: [GardenStyleService, GardenStyleRepository, PrismaService],
})
export class GardenStyleModule {}
