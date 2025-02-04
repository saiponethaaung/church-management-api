import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorItem } from 'src/interfaces/error-object.interface';

export class InputValidationExceptionFilter extends HttpException {
  constructor(errors: ErrorItem[]) {
    super(
      {
        errorCode: 'input_validation_failed',
        message: 'Input validation failed!',
        errors,
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
