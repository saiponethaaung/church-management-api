import { HttpException, HttpStatus } from '@nestjs/common';
import { ServiceResponseError } from 'src/interfaces/error-object.interface';

export class HandledExceptionFilter extends HttpException {
  constructor(error: ServiceResponseError, status: HttpStatus) {
    super(
      {
        ...error,
      },
      status,
    );
  }
}
