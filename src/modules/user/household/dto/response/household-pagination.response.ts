import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationResponse } from 'src/dto/response/pagination.response';
import { HouseholdResponse } from './household.response';

@ObjectType()
export class HouseholdPaginationResponse {
  @Field(() => [HouseholdResponse])
  data: HouseholdResponse[];

  @Field(() => PaginationResponse)
  pagination: PaginationResponse;
}
