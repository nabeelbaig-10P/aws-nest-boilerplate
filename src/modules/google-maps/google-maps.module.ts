import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GoogleMapsController } from './google-maps.controller';
import { GoogleMapsService } from './google-maps.service';

@Module({
    imports: [HttpModule],
    controllers: [GoogleMapsController],
    providers: [GoogleMapsService],
})
export class GoogleMapsModule {}
