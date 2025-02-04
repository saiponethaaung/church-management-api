import { Injectable, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { InputValidationExceptionFilter } from 'src/filters/input-validation-exception/input-validation-exception.filter';
import { ErrorItemWithChild } from 'src/interfaces/error-object.interface';

@Injectable()
export class InputValidationPipe extends ValidationPipe {
  constructor() {
    super({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      whitelist: true,
      exceptionFactory: (errors) => {
        let errorMessage: ErrorItemWithChild[] = [];

        const parseErrorMessage = (
          errors: ValidationError[],
          prefix: string = '',
        ) => {
          let results: ErrorItemWithChild[] = [];

          if (prefix) {
            prefix = prefix + '_';
          }

          for (const error of errors) {
            if (error.children.length > 0) {
              results = [
                ...results,
                ...parseErrorMessage(error.children, prefix + error.property),
              ];
            } else {
              results.push({
                property: prefix + error.property,
                message:
                  prefix +
                  error.property +
                  '_' +
                  error.constraints[Object.keys(error.constraints)[0]],
                children: [],
              });
            }
          }

          return results;
        };

        errorMessage = parseErrorMessage(errors);

        return new InputValidationExceptionFilter(errorMessage);
      },
    });
  }
}
