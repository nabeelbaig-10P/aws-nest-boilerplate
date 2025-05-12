import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { descriptions, messages } from 'src/common/constants';
import { JwtAuthGuard } from 'src/modules/authentication/guards';
import { AuthenticatedRequest } from 'src/modules/authentication/interfaces';
import { GenerateImageDto } from './dto/generate-images.dto';
import { GenerateImagesService } from './generate-images.service';

@UseGuards(JwtAuthGuard)
@ApiTags('Generate AI Images')
@Controller('re-imagine/generate-images')
export class GenerateImagesController {
    constructor(private readonly generateImagesService: GenerateImagesService) {}

    @ApiBearerAuth()
    @ApiOperation({
        description: descriptions.GENERATE_IMAGES.CREATE,
    })
    @Post('')
    async generateReImagineImages(
        @Req() req: AuthenticatedRequest,
        @Body() generateImageDto: GenerateImageDto,
    ): Promise<{ message: string; data: any }> {
        const { userId } = req.user;
        const autoMask = await this.generateImagesService.generateReImagineImages(
            userId,
            generateImageDto,
        );
        return { message: messages.GENERATE_IMAGES.CREATE_SUCCESS, data: autoMask };
    }

    @ApiBearerAuth()
    @ApiOperation({
        description: descriptions.GENERATE_IMAGES.FETCH,
    })
    @Get('/:uuid')
    async fetchReImagineImages(
        @Req() req: AuthenticatedRequest,
        @Param('uuid') uuid: string,
    ): Promise<{ message: string; data: any }> {
        const { userId } = req.user;
        const autoMask = await this.generateImagesService.fetchReImagineImages(userId, uuid);
        return { message: messages.GENERATE_IMAGES.FETCH_SUCCESS, data: autoMask };
    }
}
