import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserGQLJwtAuthGuard } from 'src/libs/passport/user/user-gql-jwt.guard';
import { GQLCurrentUser } from 'src/decorators/gql-current-user.decorator';
import { HandledExceptionFilter } from 'src/filters/handled-exception/handled-exception.filter';
import { ProgramPlanProposalService } from './program-plan-proposal.service';
import { CreateProposalRequest } from './dto/request/create-proposal.request';
import { ProgramPlanSectionProposalResponse } from '../program-plan-section/dto/response/program-plan-section.response';
import { MessageResponse } from 'src/dto/response/message.response';

@Resolver(() => ProgramPlanSectionProposalResponse)
@UseGuards(UserGQLJwtAuthGuard)
export class ProgramPlanProposalResolver {
  constructor(private readonly service: ProgramPlanProposalService) {}

  @Mutation(() => ProgramPlanSectionProposalResponse)
  async createProposal(
    @GQLCurrentUser() user: User,
    @Args('createProposal') dto: CreateProposalRequest,
  ) {
    const serviceResponse = await this.service.createProposal(user, dto);
    if (!serviceResponse.status) {
      throw new HandledExceptionFilter(serviceResponse.error, serviceResponse.code);
    }
    return serviceResponse.result;
  }

  @Mutation(() => ProgramPlanSectionProposalResponse)
  async acceptProposal(@Args('id') id: string) {
    const serviceResponse = await this.service.acceptProposal(id);
    if (!serviceResponse.status) {
      throw new HandledExceptionFilter(serviceResponse.error, serviceResponse.code);
    }
    return serviceResponse.result;
  }

  @Mutation(() => MessageResponse)
  async deleteProposal(@Args('id') id: string) {
    const serviceResponse = await this.service.deleteProposal(id);
    if (!serviceResponse.status) {
      throw new HandledExceptionFilter(serviceResponse.error, serviceResponse.code);
    }
    return serviceResponse.result;
  }

  @Query(() => [ProgramPlanSectionProposalResponse])
  async getSectionProposals(@Args('sectionId') sectionId: string) {
    const serviceResponse = await this.service.getSectionProposals(sectionId);
    if (!serviceResponse.status) {
      throw new HandledExceptionFilter(serviceResponse.error, serviceResponse.code);
    }
    return serviceResponse.result;
  }
}
