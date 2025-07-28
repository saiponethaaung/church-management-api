import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserGQLJwtAuthGuard } from 'src/libs/passport/user/user-gql-jwt.guard';
import { MemberService } from './member.service';
import { MemberResponse } from './dto/response/member.response';
import { GQLCurrentUser } from 'src/decorators/gql-current-user.decorator';
import { User } from '@prisma/client';
import { CreateMemberData } from './dto/request/create-member.request';
import { HandledExceptionFilter } from 'src/filters/handled-exception/handled-exception.filter';
import { MemberPaginationResponse } from './dto/response/member-pagination.response';
import { GetMembersData } from './dto/request/get-members.request';
import { UpdateMemberData } from './dto/request/update-member.request';
import { MessageResponse } from 'src/dto/response/message.response';
import { DeleteMemberData } from './dto/request/delete-member.request';

@UseGuards(UserGQLJwtAuthGuard)
@Resolver()
export class MemberResolver {
  constructor(private readonly service: MemberService) {}

  @Mutation(() => MemberResponse)
  async createMember(
    @GQLCurrentUser() user: User,
    @Args('createMember') dto: CreateMemberData,
  ) {
    const serviceResponse = await this.service.createMember(user, dto);

    if (!serviceResponse.status) {
      throw new HandledExceptionFilter(
        serviceResponse.error,
        serviceResponse.code,
      );
    }

    return serviceResponse.result;
  }

  @Query(() => MemberPaginationResponse)
  async getMembers(@Args('getMembers') dto: GetMembersData) {
    const serviceResponse = await this.service.getMembers(dto);

    if (!serviceResponse.status) {
      throw new HandledExceptionFilter(
        serviceResponse.error,
        serviceResponse.code,
      );
    }

    return serviceResponse.result;
  }

  @Mutation(() => MemberResponse)
  async updateMember(
    @GQLCurrentUser() user: User,
    @Args('updateMember') dto: UpdateMemberData,
  ) {
    const serviceResponse = await this.service.updateMember(user, dto);

    if (!serviceResponse.status) {
      throw new HandledExceptionFilter(
        serviceResponse.error,
        serviceResponse.code,
      );
    }

    return serviceResponse.result;
  }

  @Mutation(() => MessageResponse)
  async deleteMember(
    @GQLCurrentUser() user: User,
    @Args('deleteMember') dto: DeleteMemberData,
  ) {
    const serviceResponse = await this.service.deleteMember(user, dto);

    if (!serviceResponse.status) {
      throw new HandledExceptionFilter(
        serviceResponse.error,
        serviceResponse.code,
      );
    }

    return serviceResponse.result;
  }
}
