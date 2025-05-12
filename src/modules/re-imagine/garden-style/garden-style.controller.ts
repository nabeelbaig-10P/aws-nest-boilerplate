import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GardenStyle } from '@prisma/client';
import { descriptions, messages } from '../../../common/constants';
import { JwtAuthGuard } from '../../authentication/guards';
import { GardenStyleService } from './garden-style.service';

@UseGuards(JwtAuthGuard)
@ApiTags('Garden Styles')
@Controller('re-imagine/garden-styles')
export class GardenStyleController {
    constructor(private readonly gardenStyleService: GardenStyleService) {}

    @ApiBearerAuth()
    @ApiOperation({
        description: descriptions.GARDEN_STYLES.FETCH,
    })
    @Get('/')
    async findAll(): Promise<{ message: string; data: GardenStyle[] }> {
        const gardenStyles: GardenStyle[] = await this.gardenStyleService.findAll();
        return {
            message: messages.DATA_FETCHED_SUCCESS,
            data: gardenStyles,
        };
    }
}
