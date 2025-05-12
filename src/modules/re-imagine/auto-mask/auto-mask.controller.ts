import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { descriptions, messages } from 'src/common/constants';
import { JwtAuthGuard } from 'src/modules/authentication/guards';
import { AuthenticatedRequest } from 'src/modules/authentication/interfaces';
import { AutoMaskService } from './auto-mask.service';
import { AutoMaskDto } from './dto/auto-mask.dto';
import { AutoMaskDetailsResponse, CreateAutoMaskResponse } from './interfaces';

@UseGuards(JwtAuthGuard)
@ApiTags('Auto Mask')
@Controller('re-imagine/auto-mask')
export class AutoMaskController {
    constructor(private readonly autoMaskService: AutoMaskService) {}

    @ApiBearerAuth()
    @ApiOperation({
        description: descriptions.AUTO_MASK.CREATE,
    })
    @Post('')
    async createAutoMask(
        @Req() req: AuthenticatedRequest,
        @Body() autoMaskDto: AutoMaskDto,
    ): Promise<{ message: string; data: CreateAutoMaskResponse }> {
        const { userId } = req.user;
        const autoMask = await this.autoMaskService.autoMaskImage(userId, autoMaskDto);
        return { message: messages.AUTO_MASK.CREATE_SUCCESS, data: autoMask };
    }

    @ApiBearerAuth()
    @ApiOperation({
        description: descriptions.AUTO_MASK.FETCH,
    })
    @Get('/:uuid')
    async fetchAutoMask(
        @Req() req: AuthenticatedRequest,
        @Param('uuid') uuid: string,
    ): Promise<{ message: string; data: AutoMaskDetailsResponse }> {
        const { userId } = req.user;
        const autoMask = await this.autoMaskService.fetchAutoMaskDetails(userId, uuid);
        return { message: messages.AUTO_MASK.FETCH_SUCCESS, data: autoMask };
    }
}
