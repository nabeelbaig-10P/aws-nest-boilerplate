import { PutObjectCommand } from '@aws-sdk/client-s3';
import { badRequest } from '@hapi/boom';
import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { catchError, firstValueFrom } from 'rxjs';
import { s3Client } from 'src/common/aws/aws-s3.client';
import { messages } from 'src/common/constants';
import { LogModuleTypes } from 'src/common/enums/log-modules.enum';
import { v4 as uuidv4 } from 'uuid';
import { Logger } from 'winston';
import { GetStreetViewDto } from './dto/get-street-view.dto';

@Injectable()
export class GoogleMapsService {
    private readonly googleMapsApiKey: string;
    private readonly s3BucketName: string;

    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {
        this.googleMapsApiKey = this.configService.getOrThrow<string>('googleMaps.apiKey');
        this.s3BucketName = this.configService.getOrThrow<string>('aws.s3BucketName');
    }

    async getStreetViewImage(
        getStreetViewDto: GetStreetViewDto,
    ): Promise<{ streetViewImageUrl: string }> {
        const { address } = getStreetViewDto;
        const { lat, lng } = await this.getCoordinates(address);

        const streetViewUrl = `https://maps.googleapis.com/maps/api/streetview?size=640x640&location=${lat},${lng}&key=${this.googleMapsApiKey}`;

        const { data: imageBuffer } = await firstValueFrom(
            this.httpService.get<ArrayBuffer>(streetViewUrl, { responseType: 'arraybuffer' }),
        );

        const fileName = `${uuidv4()}.jpg`;
        await this.uploadToS3(fileName, imageBuffer);

        const s3Url = `https://${this.s3BucketName}.s3.amazonaws.com/${fileName}`;

        this.logger.info('Street View image uploaded successfully', {
            module: LogModuleTypes.GOOGLE_MAPS,
            data: { address, fileName, s3Url },
        });

        return { streetViewImageUrl: s3Url };
    }

    private async getCoordinates(address: string): Promise<{ lat: number; lng: number }> {
        const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${this.googleMapsApiKey}`;

        const { data } = await firstValueFrom(
            this.httpService.get(geocodingUrl).pipe(
                catchError((error: AxiosError) => {
                    this.logger.error('Error fetching coordinates from Google Maps', {
                        module: LogModuleTypes.GOOGLE_MAPS,
                        error: error.response?.data,
                    });
                    throw badRequest(messages.GOOGLE_MAPS.COORDINATES_NOT_FOUND);
                }),
            ),
        );

        if (data.status !== 'OK' || !data.results.length) {
            throw badRequest(messages.GOOGLE_MAPS.ADDRESS_NOT_FOUND_OR_INVALID);
        }

        const { lat, lng } = data.results[0].geometry.location;
        return { lat, lng };
    }

    private async uploadToS3(fileName: string, fileBuffer: ArrayBuffer): Promise<void> {
        try {
            const command = new PutObjectCommand({
                Bucket: this.s3BucketName,
                Key: fileName,
                Body: Buffer.from(fileBuffer),
                ContentType: 'image/jpeg',
            });

            await s3Client.send(command);
        } catch (error) {
            this.logger.error('Failed to upload image to S3', {
                module: LogModuleTypes.GOOGLE_MAPS,
                error,
            });
            throw badRequest(messages.GOOGLE_MAPS.IMAGE_UPLOAD_FAILED);
        }
    }
}
