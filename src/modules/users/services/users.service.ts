import { badRequest } from '@hapi/boom';
import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { messages } from 'src/common/constants/messages';
import { LogModuleTypes } from 'src/common/enums/log-modules.enum';
import { PrismaService } from 'src/prisma/prisma.service';
import { Logger } from 'winston';
import { PostSignupUserDto, UpdateUserDto, UserDetailsResponseDto } from '../dto';
import { AddressesRepository, RolesRepository, UsersRepository } from '../repositories';

@Injectable()
export class UsersService {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
        private readonly usersRepository: UsersRepository,
        private readonly rolesRepository: RolesRepository,
        private readonly addressesRepository: AddressesRepository,
        private readonly prisma: PrismaService,
    ) {}

    async userPostSignup(postSignupUserDto: PostSignupUserDto): Promise<void> {
        const { cognitoId, email } = postSignupUserDto;

        // Email and cognitoId must be unique for every user
        const existingUser = await this.usersRepository.findUserByEmailOrCognitoId(
            cognitoId,
            email,
        );

        if (existingUser) {
            throw badRequest(messages.USER.ALREADY_EXISTS);
        }

        return this.createUserWithAddressAndRole(postSignupUserDto);
    }

    async getUserDetails(userId: number): Promise<UserDetailsResponseDto> {
        const user = await this.usersRepository.getUserDetails(userId);
        if (!user) {
            throw badRequest(messages.USER.NOT_FOUND);
        }
        return user;
    }

    async update(userId: number, updateUserDto: UpdateUserDto): Promise<void> {
        const { address, ...userFields } = updateUserDto;
        await this.getUserDetails(userId);
        return this.prisma.$transaction(async (prismaClient: PrismaClient): Promise<void> => {
            await this.usersRepository.update(userId, userFields, prismaClient);
            await this.addressesRepository.update(userId, address, prismaClient);
        });
    }

    private async createUserWithAddressAndRole(userData: PostSignupUserDto): Promise<void> {
        const role = await this.rolesRepository.findRoleByName(userData.role);
        if (!role) {
            throw badRequest(messages.USER.ROLE_NOT_FOUND);
        }

        return this.prisma.$transaction(async (prismaClient: PrismaClient): Promise<void> => {
            const newUser = await this.usersRepository.insertUser(prismaClient, {
                ...userData,
            });

            await this.addressesRepository.insertUserAddress(prismaClient, {
                country: userData.country,
                state: userData.state,
                userId: newUser.id,
            });

            await this.rolesRepository.insertUserRole(prismaClient, {
                userId: newUser.id,
                roleId: role.id,
            });

            this.logger.info('User created successfully', {
                module: LogModuleTypes.USERS,
                data: {
                    userId: newUser.id,
                },
            });
        });
    }
}
