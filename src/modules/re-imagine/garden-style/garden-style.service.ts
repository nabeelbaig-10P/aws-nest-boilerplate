import { Injectable } from '@nestjs/common';
import { GardenStyle } from '@prisma/client';
import { GardenStyleRepository } from './garden-style.repository';

@Injectable()
export class GardenStyleService {
    constructor(private readonly gardenStyleService: GardenStyleRepository) {}

    async findAll(): Promise<GardenStyle[]> {
        return this.gardenStyleService.findAll();
    }
}
