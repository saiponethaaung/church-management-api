import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const EXCLUDE_URLS: string[] = [
  // '/v1/user/:id/avatar'
];

@Injectable()
export class ResponseFormatInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (context.getType() !== 'http') {
      return next.handle();
    }

    const url = context.switchToHttp().getRequest().route.path;

    if (EXCLUDE_URLS.includes(url)) {
      return next.handle();
    }

    return next.handle().pipe(
      map((value) => {
        if (!value) {
          return { data: null };
        }

        if (value.data) {
          return value;
        }

        return { data: value };
      }),
    );
  }
}
