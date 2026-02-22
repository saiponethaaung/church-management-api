import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserGQLJwtAuthGuard } from 'src/libs/passport/user/user-gql-jwt.guard';
import { MemberTypeService } from './member-type.service';
import { MemberTypeResponse } from './dto/response/member-type.response';
import { GQLCurrentUser } from 'src/decorators/gql-current-user.decorator';
import { User } from '@prisma/client';
import { CreateMemberTypeData } from './dto/request/create-member-type.request';
import { HandledExceptionFilter } from 'src/filters/handled-exception/handled-exception.filter';
import { UpdateMemberTypeData } from './dto/request/update-member-type.request';
import { MessageResponse } from 'src/dto/response/message.response';
import { MemberTypePaginationResponse } from './dto/response/member-type-pagination.response';
import { GetMemberTypesData } from './dto/request/get-member-types.request';

@UseGuards(UserGQLJwtAuthGuard)
@Resolver(() => MemberTypeResponse)
export class MemberTypeResolver {
  constructor(private readonly service: MemberTypeService) {}

  @Mutation(() => MemberTypeResponse)
  async createMemberType(
    @GQLCurrentUser() user: User,
    @Args('createMemberType') dto: CreateMemberTypeData,
  ) {
    const serviceResponse = await this.service.createMemberType(user, dto);

    if (!serviceResponse.status) {
      throw new HandledExceptionFilter(
        serviceResponse.error,
        serviceResponse.code,
      );
    }

    return serviceResponse.result;
  }

  @Mutation(() => MemberTypeResponse)
  async updateMemberType(
    @GQLCurrentUser() user: User,
    @Args('updateMemberType') dto: UpdateMemberTypeData,
  ) {
    const serviceResponse = await this.service.updateMemberType(user, dto);

    if (!serviceResponse.status) {
      throw new HandledExceptionFilter(
        serviceResponse.error,
        serviceResponse.code,
      );
    }

    return serviceResponse.result;
  }

  @Mutation(() => MessageResponse)
  async deleteMemberType(
    @GQLCurrentUser() user: User,
    @Args('id') id: string,
  ) {
    const serviceResponse = await this.service.deleteMemberType(user, id);

    if (!serviceResponse.status) {
      throw new HandledExceptionFilter(
        serviceResponse.error,
        serviceResponse.code,
      );
    }

    return serviceResponse.result;
  }

  @Query(() => MemberTypeResponse, { name: 'getMemberType' })
  async getMemberType(@Args('id') id: string) {
    const serviceResponse = await this.service.getMemberType(id);

    if (!serviceResponse.status) {
      throw new HandledExceptionFilter(
        serviceResponse.error,
        serviceResponse.code,
      );
    }

    return serviceResponse.result;
  }

  @Query(() => MemberTypePaginationResponse, { name: 'getMemberTypes' })
  async getMemberTypes(
    @Args('query') query: GetMemberTypesData,
  ) {
    const serviceResponse = await this.service.getMemberTypes(query);

    if (!serviceResponse.status) {
      throw new HandledExceptionFilter(
        serviceResponse.error,
        serviceResponse.code,
      );
    }

    return serviceResponse.result;
  }
}
