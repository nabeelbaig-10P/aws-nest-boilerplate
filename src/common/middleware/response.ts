import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

interface ResponseData {
    data?: any[];
    message: string;
    success?: boolean;
    error?: Record<string, any> | string | null;
}

export class CustomResponseMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction): void {
        const originalJson = res.json;

        res.json = function (resData: ResponseData): any {
            const isErrorResponse = resData.error || res.statusCode >= 400;
            const response = {
                data: resData.data || [],
                message: resData.message || 'Success',
                success: resData.success === false ? false : !isErrorResponse,
                error: resData.error,
            };

            originalJson.call(this, response);
        };

        next();
    }
}
