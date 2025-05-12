import { Module } from '@nestjs/common';
import { JwtStrategy } from './strategy';
import { UsersRepository } from '../users/repositories';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
    providers: [JwtStrategy, UsersRepository, PrismaService],
})
export class AuthenticationModule {}
