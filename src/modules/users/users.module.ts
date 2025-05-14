import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AddressesRepository, RolesRepository, UsersRepository } from './repositories';
import { UsersController } from './controllers';
import { UsersService } from './services';

@Module({
    imports: [PrismaModule],
    controllers: [UsersController],
    providers: [UsersService, UsersRepository, RolesRepository, AddressesRepository],
    // Export what we want to reuse in other modules.
    exports: [UsersService],
})
export class UsersModule {}
