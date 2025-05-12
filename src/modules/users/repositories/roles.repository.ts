import { Injectable } from '@nestjs/common';
import { PrismaClient, Role, UserRole } from '@prisma/client';
import { Roles } from 'src/common/enums/roles.enum';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RolesRepository {
    constructor(private prisma: PrismaService) {}

    async findRoleByName(role: Roles): Promise<Role | null> {
        return this.prisma.role.findFirst({
            where: {
                name: {
                    contains: role,
                },
            },
        });
    }

    async insertUserRole(
        prismaClient: PrismaClient,
        payload: {
            userId: number;
            roleId: number;
        },
    ): Promise<UserRole> {
        return prismaClient.userRole.create({
            data: {
                userId: payload.userId,
                roleId: payload.roleId,
            },
        });
    }
}
