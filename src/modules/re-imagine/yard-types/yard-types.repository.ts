import { Injectable } from '@nestjs/common';
import { YardType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class YardTypesRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(): Promise<YardType[]> {
        return this.prisma.yardType.findMany();
    }
}
