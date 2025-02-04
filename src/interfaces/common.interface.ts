export interface KVInterface<T = any> {
  [key: string]: T;
}

export interface StreamDataInterface<T> {
  items: T[];
  cursor?: {
    start: string;
    end: string;
  };
}
