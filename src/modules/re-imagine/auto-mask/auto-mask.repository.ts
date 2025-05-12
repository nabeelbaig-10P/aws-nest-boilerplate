import { Injectable } from '@nestjs/common';
import { AutoMask } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AutoMaskRepository {
    constructor(private readonly prisma: PrismaService) {}

    async fetchUserAutoMaskJob(userId: number, uuid: string): Promise<AutoMask | null> {
        return this.prisma.autoMask.findFirst({
            where: { uuid, userId },
        });
    }

    async createAutoMaskJob(payload: {
        userId: number;
        jobId: string;
        imageUrl: string;
    }): Promise<AutoMask> {
        return this.prisma.autoMask.create({
            data: {
                jobId: payload.jobId,
                userId: payload.userId,
                imageUrl: payload.imageUrl,
            },
        });
    }
}
