import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationResponse } from 'src/dto/response/pagination.response';
import { DonationResponse } from './donation.response';

@ObjectType()
export class DonationPaginationResponse {
  @Field(() => [DonationResponse])
  data: DonationResponse[];

  @Field(() => PaginationResponse)
  pagination: PaginationResponse;
}
