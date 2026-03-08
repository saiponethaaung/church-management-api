import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UserGQLJwtAuthGuard } from 'src/libs/passport/user/user-gql-jwt.guard';
import { HandledExceptionFilter } from 'src/filters/handled-exception/handled-exception.filter';
import { ProgramPlanSectionService } from './program-plan-section.service';
import { CreateProgramPlanSectionRequest } from './dto/request/create-program-plan-section.request';
import { UpdateProgramPlanSectionRequest } from './dto/request/update-program-plan-section.request';
import { ReorderProgramPlanSectionsRequest } from './dto/request/reorder-program-plan-sections.request';
import { ProgramPlanSectionResponse } from './dto/response/program-plan-section.response';
import { MessageResponse } from 'src/dto/response/message.response';

@Resolver(() => ProgramPlanSectionResponse)
@UseGuards(UserGQLJwtAuthGuard)
export class ProgramPlanSectionResolver {
  constructor(private readonly service: ProgramPlanSectionService) {}

  @Mutation(() => ProgramPlanSectionResponse)
  async createPlanSection(
    @Args('createPlanSection') dto: CreateProgramPlanSectionRequest,
  ) {
    const serviceResponse = await this.service.createSection(dto);
    if (!serviceResponse.status) {
      throw new HandledExceptionFilter(serviceResponse.error, serviceResponse.code);
    }
    return serviceResponse.result;
  }

  @Mutation(() => ProgramPlanSectionResponse)
  async updatePlanSection(
    @Args('updatePlanSection') dto: UpdateProgramPlanSectionRequest,
  ) {
    const serviceResponse = await this.service.updateSection(dto);
    if (!serviceResponse.status) {
      throw new HandledExceptionFilter(serviceResponse.error, serviceResponse.code);
    }
    return serviceResponse.result;
  }

  @Mutation(() => MessageResponse)
  async deletePlanSection(@Args('id') id: string) {
    const serviceResponse = await this.service.deleteSection(id);
    if (!serviceResponse.status) {
      throw new HandledExceptionFilter(serviceResponse.error, serviceResponse.code);
    }
    return serviceResponse.result;
  }

  @Query(() => [ProgramPlanSectionResponse])
  async getPlanSections(@Args('programPlanId') programPlanId: string) {
    const serviceResponse = await this.service.getSections(programPlanId);
    if (!serviceResponse.status) {
      throw new HandledExceptionFilter(serviceResponse.error, serviceResponse.code);
    }
    return serviceResponse.result;
  }

  @Mutation(() => [ProgramPlanSectionResponse])
  async reorderPlanSections(
    @Args('reorderPlanSections') dto: ReorderProgramPlanSectionsRequest,
  ) {
    const serviceResponse = await this.service.reorderSections(dto);
    if (!serviceResponse.status) {
      throw new HandledExceptionFilter(serviceResponse.error, serviceResponse.code);
    }
    return serviceResponse.result;
  }
}
