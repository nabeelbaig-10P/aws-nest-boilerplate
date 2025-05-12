import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { GenerateImageDto } from './dto/generate-images.dto';
import { GenerateImagesRepository } from './generate-images.repository';

@Injectable()
export class GenerateImagesService {
    private readonly baseUrl: string;
    private readonly apiKey: string;

    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
        private readonly maskRepository: GenerateImagesRepository,
    ) {
        this.apiKey = this.configService.getOrThrow<string>('reImagine.apiKey');
        this.baseUrl = this.configService.getOrThrow<string>('reImagine.baseUrl');
    }

    async generateReImagineImages(
        userId: number,
        generateImageDto: GenerateImageDto,
    ): Promise<any> {
        return { userId, generateImageDto };
    }

    async fetchReImagineImages(userId: number, uuid: string): Promise<any> {
        return { userId, uuid };
    }
}
