import { Field, ObjectType } from '@nestjs/graphql';
import { ProgramResponse } from './program.response';
import { PaginationResponse } from 'src/dto/response/pagination.response';

@ObjectType()
export class ProgramPaginationResponse {
  @Field(() => [ProgramResponse])
  data: ProgramResponse[];

  @Field(() => PaginationResponse)
  pagination: PaginationResponse;
}
