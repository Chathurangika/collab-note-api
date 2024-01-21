import {
  Injectable,
  CallHandler,
  NestInterceptor,
  ExecutionContext,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export default class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();

    const now = Date.now();

    return next.handle().pipe(
      map((data) => {
        return {
          status: 'success',
          timestamp: new Date().toISOString(),
          elapsed: `${Date.now() - now}ms`,
          path: request.url,
          data,
        };
      }),
    );
  }
}
