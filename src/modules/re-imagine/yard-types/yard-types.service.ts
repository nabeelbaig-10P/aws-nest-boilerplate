import { Injectable } from '@nestjs/common';
import { YardType } from '@prisma/client';
import { YardTypesRepository } from './yard-types.repository';

@Injectable()
export class YardTypesService {
    constructor(private readonly yardTypesRepository: YardTypesRepository) {}

    async findAll(): Promise<YardType[]> {
        return this.yardTypesRepository.findAll();
    }
}
