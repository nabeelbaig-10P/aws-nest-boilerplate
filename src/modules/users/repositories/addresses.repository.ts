import { Injectable } from '@nestjs/common';
import { Address, PrismaClient } from '@prisma/client';
import { AddressResponseDto } from '../dto';

@Injectable()
export class AddressesRepository {
    constructor() {}

    async insertUserAddress(
        prismaClient: PrismaClient,
        payload: {
            country: string;
            state: string;
            userId: number;
        },
    ): Promise<Address> {
        return prismaClient.address.create({
            data: {
                country: payload.country,
                state: payload.state,
                userId: payload.userId,
            },
        });
    }

    async update(
        userId: number,
        address: AddressResponseDto,
        prismaClient: PrismaClient,
    ): Promise<Address> {
        return prismaClient.address.upsert({
            where: { userId },
            create: {
                userId,
                country: address.country,
                state: address.state,
            },
            update: {
                country: address.country,
                state: address.state,
            },
        });
    }
}
