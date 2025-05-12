import { unauthorized } from '@hapi/boom';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { messages } from 'src/common/constants/messages';

@Injectable()
export class ApiKeyGuard implements CanActivate {
    constructor(private configService: ConfigService) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<Request>();
        const apiKeyHeader = request.headers['x-api-key'] as string | undefined;
        const validApiKey = this.configService.get<string>('apiKey');

        if (!apiKeyHeader || apiKeyHeader !== validApiKey) {
            throw unauthorized(messages.AUTH.INVALID_API_KEY);
        }

        return true;
    }
}
