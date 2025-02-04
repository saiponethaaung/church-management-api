import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { LoggingService } from 'src/libs/logging/logging.service';
import { HandledExceptionFilter } from '../handled-exception/handled-exception.filter';
import { InputValidationExceptionFilter } from '../input-validation-exception/input-validation-exception.filter';
import { ErrorObject } from 'src/interfaces/error-object.interface';
import { LOG_LEVEL } from 'src/interfaces/logging.interface';
import { Response } from 'express';
import { GraphQLError } from 'graphql';

@Catch()
export class GlobalExceptionHandlerFilter implements ExceptionFilter {
  constructor() {}

  catch(exception: HttpException | Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    if (
      host.getType() !== 'http' &&
      exception instanceof InputValidationExceptionFilter == false &&
      exception instanceof HandledExceptionFilter == false
    ) {
      return;
    }

    const loggerService = new LoggingService(ctx.getRequest());

    const response = ctx.getResponse<Response>();

    if (response.headersSent) {
      return;
    }

    const result: ErrorObject = {
      errorCode: 'unknown_error',
      message: 'Unknown error!',
      errors: [],
    };

    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    let stackTrace: string | any[] = exception.stack ?? [];
    let reportSentry = false;

    // Handler http exception
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const { errors, errorCode, message } = exception.getResponse() as any;

      if (
        (exception instanceof InputValidationExceptionFilter ||
          exception instanceof HandledExceptionFilter) &&
        host.getType() !== 'http'
      ) {
        console.log('errorCode', errorCode);
        throw new GraphQLError(errorCode, {
          extensions: {
            info: {
              errors,
              errorCode,
              message,
            },
          },
        });
      }

      result.errorCode = errorCode ?? result.errorCode;
      result.message = message ?? result.message;
      result.errors = errors ?? result.errors;

      // convert to array if the stack is single string
      if (typeof stackTrace === 'string') {
        stackTrace = [stackTrace];
      }

      // Omit stack trace if it is a validation error or handle exception error
      if (
        exception instanceof InputValidationExceptionFilter ||
        exception instanceof HandledExceptionFilter ||
        exception instanceof UnauthorizedException
      ) {
        stackTrace = [];
      } else {
        reportSentry = true;
      }
    } else {
      // Handle throw error from application
      result.message = exception.message;
      stackTrace = exception.stack;
      reportSentry = true;
    }

    // Show stacktrace if it's not a production
    if (process.env.NODE_ENV !== 'production') {
      result.stackTrace = stackTrace;
    }

    if (reportSentry) {
      console.error(exception);
      loggerService.log(
        {
          message: 'Unhandled error',
          content: { ...result, stackTrace, exception },
        },
        LOG_LEVEL.Critical,
        false,
      );
    }

    response.status(status).json(result);
  }
}
