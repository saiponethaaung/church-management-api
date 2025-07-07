import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationResponse } from 'src/dto/response/pagination.response';
import { ChurchResponse } from './church.response';

@ObjectType({ description: 'churchPagination' })
export class ChurchPaginationResponse {
  @Field(() => [ChurchResponse])
  data: ChurchResponse[];

  @Field(() => PaginationResponse)
  pagination: PaginationResponse;
}
