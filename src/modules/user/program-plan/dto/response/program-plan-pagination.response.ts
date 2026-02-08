import { Field, ObjectType } from '@nestjs/graphql';
import { ProgramPlanResponse } from './program-plan.response';
import { PaginationResponse } from 'src/dto/response/pagination.response';

@ObjectType()
export class ProgramPlanPaginationResponse {
  @Field(() => [ProgramPlanResponse])
  data: ProgramPlanResponse[];

  @Field(() => PaginationResponse)
  pagination: PaginationResponse;
}
