import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { YardTypesController } from './yard-types.controller';
import { YardTypesRepository } from './yard-types.repository';
import { YardTypesService } from './yard-types.service';

@Module({
    imports: [PrismaModule],
    controllers: [YardTypesController],
    providers: [YardTypesService, YardTypesRepository],
})
export class YardTypesModule {}
