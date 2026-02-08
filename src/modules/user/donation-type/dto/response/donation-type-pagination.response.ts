import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationResponse } from 'src/dto/response/pagination.response';
import { DonationTypeResponse } from './donation-type.response';

@ObjectType()
export class DonationTypePaginationResponse {
  @Field(() => [DonationTypeResponse])
  data: DonationTypeResponse[];

  @Field(() => PaginationResponse)
  pagination: PaginationResponse;
}
