import { HttpStatus } from '@nestjs/common';
import { ServiceResponseError } from './error-object.interface';

export interface ServiceResponse<T> {
  status: boolean;
  code?: HttpStatus;
  message?: string;
  error?: ServiceResponseError;
  result?: T;
}

export interface PaginationResponse<T> {
  data: T[];
  pagination: {
    totalCount: number;
    totalPage: number;
    currentPage: number;
    limit: number;
    // nextCursor?: string;
    // prevCursor?: string;
  };
}
