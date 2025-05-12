import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostSignupUserDto, UserDetailsResponseDto } from '../dto';

@Injectable()
export class UsersRepository {
    constructor(private prisma: PrismaService) {}

    async findUserByCognitoId(cognitoId: string): Promise<User | null> {
        return this.prisma.user.findFirst({
            where: { cognitoId },
        });
    }

    async findUserByEmailOrCognitoId(cognitoId: string, email: string): Promise<User | null> {
        return this.prisma.user.findFirst({
            where: { OR: [{ cognitoId }, { email }] },
        });
    }

    async insertUser(prismaClient: PrismaClient, payload: PostSignupUserDto): Promise<User> {
        return prismaClient.user.create({
            data: {
                cognitoId: payload.cognitoId,
                phone: payload.phoneNumber,
                email: payload.email,
                firstName: payload.firstName,
                lastName: payload.lastName,
            },
        });
    }

    async getUserDetails(userId: number): Promise<UserDetailsResponseDto | null> {
        return this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                uuid: true,
                email: true,
                firstName: true,
                lastName: true,
                phone: true,
                profileImg: true,
                addresses: {
                    select: {
                        country: true,
                        state: true,
                    },
                },
            },
        });
    }

    async update(
        userId: number,
        userFields: Partial<User>,
        prismaClient: PrismaClient,
    ): Promise<User> {
        return prismaClient.user.update({
            where: { id: userId },
            data: userFields,
        });
    }
}
