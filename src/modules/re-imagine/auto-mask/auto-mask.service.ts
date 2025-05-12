import { badRequest, notFound } from '@hapi/boom';
import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { catchError, firstValueFrom } from 'rxjs';
import { messages } from 'src/common/constants';
import { LogModuleTypes } from 'src/common/enums/log-modules.enum';
import { Logger } from 'winston';
import { AutoMaskDetailsResponse, CreateAutoMaskResponse } from './interfaces';
import { AutoMaskRepository } from './auto-mask.repository';
import { AutoMaskDto } from './dto/auto-mask.dto';

@Injectable()
export class AutoMaskService {
    private readonly baseUrl: string;
    private readonly apiKey: string;

    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
        private readonly maskRepository: AutoMaskRepository,
    ) {
        this.apiKey = this.configService.getOrThrow<string>('reImagine.apiKey');
        this.baseUrl = this.configService.getOrThrow<string>('reImagine.baseUrl');
    }

    async autoMaskImage(userId: number, autoMaskDto: AutoMaskDto): Promise<CreateAutoMaskResponse> {
        const { imageUrl } = autoMaskDto;
        const url = `${this.baseUrl}/create_mask`;

        const { data } = await firstValueFrom(
            this.httpService
                .post(url, { image_url: imageUrl }, { headers: this.getHeaders() })
                .pipe(
                    catchError((error: AxiosError) => {
                        const responseData = error.response?.data as { error_message?: string };
                        throw badRequest(
                            responseData.error_message ?? messages.AUTO_MASK.CREATE_FAILED,
                        );
                    }),
                ),
        );

        const { job_id: jobId } = data.data;
        const { uuid } = await this.maskRepository.createAutoMaskJob({ jobId, imageUrl, userId });

        this.logger.info('Auto mask job created successfully', {
            module: LogModuleTypes.AUTO_MASK,
            data: { userId, jobId, imageUrl },
        });

        return { uuid, jobId, imageUrl };
    }

    async fetchAutoMaskDetails(userId: number, uuid: string): Promise<AutoMaskDetailsResponse> {
        const job = await this.maskRepository.fetchUserAutoMaskJob(userId, uuid);
        if (!job) {
            throw notFound(messages.AUTO_MASK.JOB_NOT_FOUND);
        }

        const { jobId, imageUrl } = job;
        const url = `${this.baseUrl}/create_mask/${jobId}`;

        const { data } = await firstValueFrom(
            this.httpService.get(url, { headers: this.getHeaders() }).pipe(
                catchError((error: AxiosError) => {
                    const responseData = error.response?.data as { error_message?: string };
                    throw badRequest(responseData.error_message ?? messages.AUTO_MASK.FETCH_FAILED);
                }),
            ),
        );

        this.logger.info('Auto mask job details fetched successfully', {
            module: LogModuleTypes.AUTO_MASK,
            data: { userId, jobId },
        });

        return { imageUrl, ...data.data };
    }

    private getHeaders(): Record<string, string> {
        return {
            'Content-Type': 'application/json',
            'api-key': this.apiKey,
        };
    }
}
