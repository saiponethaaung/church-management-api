import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationResponse } from 'src/dto/response/pagination.response';
import { MemberResponse } from './member.response';

@ObjectType({ description: 'memberPagination' })
export class MemberPaginationResponse {
  @Field(() => [MemberResponse])
  data: MemberResponse[];

  @Field(() => PaginationResponse)
  pagination: PaginationResponse;
}
