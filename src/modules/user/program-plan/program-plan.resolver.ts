import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserGQLJwtAuthGuard } from 'src/libs/passport/user/user-gql-jwt.guard';
import { GQLCurrentUser } from 'src/decorators/gql-current-user.decorator';
import { HandledExceptionFilter } from 'src/filters/handled-exception/handled-exception.filter';
import { ProgramPlanService } from './program-plan.service';
import { CreateProgramPlanRequest } from './dto/request/create-program-plan.request';
import { UpdateProgramPlanRequest } from './dto/request/update-program-plan.request';
import { GetProgramPlansRequest } from './dto/request/get-program-plans.request';
import { ProgramPlanResponse } from './dto/response/program-plan.response';
import { ProgramPlanPaginationResponse } from './dto/response/program-plan-pagination.response';
import { MessageResponse } from 'src/dto/response/message.response';

@Resolver(() => ProgramPlanResponse)
@UseGuards(UserGQLJwtAuthGuard)
export class ProgramPlanResolver {
  constructor(private readonly service: ProgramPlanService) {}

  @Mutation(() => ProgramPlanResponse)
  async createProgramPlan(
    @GQLCurrentUser() user: User,
    @Args('createProgramPlan') dto: CreateProgramPlanRequest,
  ) {
    const serviceResponse = await this.service.createProgramPlan(user, dto);
    
    if (!serviceResponse.status) {
      throw new HandledExceptionFilter(
        serviceResponse.error,
        serviceResponse.code,
      );
    }

    return serviceResponse.result;
  }

  @Mutation(() => ProgramPlanResponse)
  async updateProgramPlan(
    @GQLCurrentUser() user: User,
    @Args('updateProgramPlan') dto: UpdateProgramPlanRequest,
  ) {
    const serviceResponse = await this.service.updateProgramPlan(user, dto);
    
    if (!serviceResponse.status) {
      throw new HandledExceptionFilter(
        serviceResponse.error,
        serviceResponse.code,
      );
    }

    return serviceResponse.result;
  }

  @Mutation(() => MessageResponse)
  async deleteProgramPlan(@Args('id') id: string) {
    const serviceResponse = await this.service.deleteProgramPlan(id);
    
    if (!serviceResponse.status) {
      throw new HandledExceptionFilter(
        serviceResponse.error,
        serviceResponse.code,
      );
    }

    return serviceResponse.result;
  }

  @Query(() => ProgramPlanResponse)
  async getProgramPlan(@Args('id') id: string) {
    const serviceResponse = await this.service.getProgramPlan(id);
    
    if (!serviceResponse.status) {
      throw new HandledExceptionFilter(
        serviceResponse.error,
        serviceResponse.code,
      );
    }

    return serviceResponse.result;
  }

  @Query(() => ProgramPlanPaginationResponse)
  async getProgramPlans(
    @Args('query') dto: GetProgramPlansRequest,
  ) {
    const serviceResponse = await this.service.getProgramPlans(dto);
    
    if (!serviceResponse.status) {
      throw new HandledExceptionFilter(
        serviceResponse.error,
        serviceResponse.code,
      );
    }

    return serviceResponse.result;
  }
}
