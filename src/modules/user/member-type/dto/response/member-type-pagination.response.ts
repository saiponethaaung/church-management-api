import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationResponse } from 'src/dto/response/pagination.response';
import { MemberTypeResponse } from './member-type.response';

@ObjectType()
export class MemberTypePaginationResponse {
  @Field(() => [MemberTypeResponse])
  data: MemberTypeResponse[];

  @Field(() => PaginationResponse)
  pagination: PaginationResponse;
}
