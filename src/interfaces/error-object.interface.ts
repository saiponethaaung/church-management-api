export interface ErrorObject {
  errorCode: string;
  message: string;
  errors: ErrorItem[];
  stackTrace?: any | any[];
}

export interface ErrorItem {
  property: string;
  message: string;
}

export interface ServiceResponseError {
  message: string;
  errorCode: string;
}

export interface ErrorItemWithChild {
  property: string;
  message: string;
  children: ErrorItemWithChild[];
}
