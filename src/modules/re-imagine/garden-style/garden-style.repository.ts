import { Injectable } from '@nestjs/common';
import { GardenStyle } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GardenStyleRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(): Promise<GardenStyle[]> {
        return this.prisma.gardenStyle.findMany();
    }
}
