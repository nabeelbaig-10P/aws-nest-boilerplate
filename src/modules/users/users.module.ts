import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AddressesRepository, RolesRepository, UsersRepository } from './repositories';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    imports: [PrismaModule],
    controllers: [UsersController],
    providers: [UsersService, UsersRepository, RolesRepository, AddressesRepository],
    // Export what we want to reuse in other modules.
    exports: [UsersService],
})
export class UsersModule {}
