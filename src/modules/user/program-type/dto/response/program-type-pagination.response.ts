import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationResponse } from 'src/dto/response/pagination.response';
import { ProgramTypeResponse } from './program-type.response';

@ObjectType()
export class ProgramTypePaginationResponse {
  @Field(() => [ProgramTypeResponse])
  data: ProgramTypeResponse[];

  @Field(() => PaginationResponse)
  pagination: PaginationResponse;
}
