import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { YardType } from '@prisma/client';
import { descriptions, messages } from '../../../common/constants';
import { JwtAuthGuard } from '../../authentication/guards';
import { YardTypesService } from './yard-types.service';

@UseGuards(JwtAuthGuard)
@ApiTags('Yard Types')
@Controller('re-imagine/yard-types')
export class YardTypesController {
    constructor(private readonly yardTypesService: YardTypesService) {}

    @ApiBearerAuth()
    @ApiOperation({
        description: descriptions.YARD_TYPES.FETCH,
    })
    @Get('/')
    async findAll(): Promise<{ message: string; data: YardType[] }> {
        const yardTypes: YardType[] = await this.yardTypesService.findAll();
        return {
            message: messages.DATA_FETCHED_SUCCESS,
            data: yardTypes,
        };
    }
}
