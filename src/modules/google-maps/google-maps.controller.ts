import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { descriptions, messages } from 'src/common/constants';
import { JwtAuthGuard } from '../authentication/guards';
import { GetStreetViewDto } from './dto/get-street-view.dto';
import { GoogleMapsService } from './google-maps.service';

@UseGuards(JwtAuthGuard)
@ApiTags('Google Maps')
@Controller('google-maps')
export class GoogleMapsController {
    constructor(private readonly googleMapsService: GoogleMapsService) {}

    @ApiBearerAuth()
    @ApiOperation({
        description: descriptions.GOOGLE_MAPS.STREET_VIEW,
    })
    @Post('street-view')
    async getStreetViewImage(
        @Body() getStreetViewDto: GetStreetViewDto,
    ): Promise<{ message: string; data: { streetViewImageUrl: string } }> {
        const imageUrl = await this.googleMapsService.getStreetViewImage(getStreetViewDto);
        return { message: messages.GOOGLE_MAPS.STREET_VIEW_SUCCESS, data: imageUrl };
    }
}
