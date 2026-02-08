import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserGQLJwtAuthGuard } from 'src/libs/passport/user/user-gql-jwt.guard';
import { HouseholdService } from './household.service';
import { HouseholdResponse } from './dto/response/household.response';
import { GQLCurrentUser } from 'src/decorators/gql-current-user.decorator';
import { User } from '@prisma/client';
import { CreateHouseholdData } from './dto/request/create-household.request';
import { HandledExceptionFilter } from 'src/filters/handled-exception/handled-exception.filter';
import { UpdateHouseholdData } from './dto/request/update-household.request';
import { MessageResponse } from 'src/dto/response/message.response';
import { HouseholdPaginationResponse } from './dto/response/household-pagination.response';
import { GetHouseholdsData } from './dto/request/get-households.request';

@UseGuards(UserGQLJwtAuthGuard)
@Resolver(() => HouseholdResponse)
export class HouseholdResolver {
  constructor(private readonly service: HouseholdService) {}

  @Mutation(() => HouseholdResponse)
  async createHousehold(
    @GQLCurrentUser() user: User,
    @Args('createHousehold') dto: CreateHouseholdData,
  ) {
    const serviceResponse = await this.service.createHousehold(user, dto);

    if (!serviceResponse.status) {
      throw new HandledExceptionFilter(
        serviceResponse.error,
        serviceResponse.code,
      );
    }

    return serviceResponse.result;
  }

  @Mutation(() => HouseholdResponse)
  async updateHousehold(
    @GQLCurrentUser() user: User,
    @Args('updateHousehold') dto: UpdateHouseholdData,
  ) {
    const serviceResponse = await this.service.updateHousehold(user, dto);

    if (!serviceResponse.status) {
      throw new HandledExceptionFilter(
        serviceResponse.error,
        serviceResponse.code,
      );
    }

    return serviceResponse.result;
  }

  @Mutation(() => MessageResponse)
  async deleteHousehold(
    @GQLCurrentUser() user: User,
    @Args('id') id: string,
  ) {
    const serviceResponse = await this.service.deleteHousehold(user, id);

    if (!serviceResponse.status) {
      throw new HandledExceptionFilter(
        serviceResponse.error,
        serviceResponse.code,
      );
    }

    return serviceResponse.result;
  }

  @Query(() => HouseholdResponse, { name: 'getHousehold' })
  async getHousehold(@Args('id') id: string) {
    const serviceResponse = await this.service.getHousehold(id);

    if (!serviceResponse.status) {
      throw new HandledExceptionFilter(
        serviceResponse.error,
        serviceResponse.code,
      );
    }

    return serviceResponse.result;
  }

  @Query(() => HouseholdPaginationResponse, { name: 'getHouseholds' })
  async getHouseholds(
    @Args('query') query: GetHouseholdsData,
  ) {
    const serviceResponse = await this.service.getHouseholds(query);

    if (!serviceResponse.status) {
      throw new HandledExceptionFilter(
        serviceResponse.error,
        serviceResponse.code,
      );
    }

    return serviceResponse.result;
  }
}
