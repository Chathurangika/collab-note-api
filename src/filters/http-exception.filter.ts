import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export default class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const now = Date.now();

    response.status(status).json({
      status: 'error',
      timestamp: new Date().toISOString(),
      elapsed: `${Date.now() - now}ms`,
      path: request.url,
      data: exception.getResponse(),
    });
  }
}
