import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationResponse } from 'src/dto/response/pagination.response';

@ObjectType()
export class PaginatedResponse<T> {
  @Field()
  data: T[];

  @Field(() => PaginationResponse)
  pagination: PaginationResponse;
}
