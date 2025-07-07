import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ChurchService } from './church.service';
import { UseGuards } from '@nestjs/common';
import { UserGQLJwtAuthGuard } from 'src/libs/passport/user/user-gql-jwt.guard';
import { ChurchResponse } from './dto/response/church.response';
import { GQLCurrentUser } from 'src/decorators/gql-current-user.decorator';
import { User } from '@prisma/client';
import { HandledExceptionFilter } from 'src/filters/handled-exception/handled-exception.filter';
import { ChurchPaginationResponse } from './dto/response/chruch-pagination.response';
import { CreateChurchData } from './dto/request/create-church.request';

@UseGuards(UserGQLJwtAuthGuard)
@Resolver()
export class ChurchResolver {
  constructor(private readonly service: ChurchService) {}

  @Query(() => ChurchResponse)
  getChurch(
    @GQLCurrentUser() user: User,
    @Args({ name: 'id', type: () => String }) id: string,
  ) {
    console.log('id', id);
    const church = new ChurchResponse();
    church.id = '123';
    return church;
  }

  @Query(() => ChurchPaginationResponse)
  async getChurchs(@GQLCurrentUser() user: User) {
    const serviceResponse = await this.service.getChruches(user);

    if (!serviceResponse.status) {
      throw new HandledExceptionFilter(
        serviceResponse.error,
        serviceResponse.code,
      );
    }

    return serviceResponse.result;
  }

  @Mutation(() => ChurchResponse)
  async createChurch(
    @GQLCurrentUser() user: User,
    @Args('createChurch') dto: CreateChurchData,
  ) {
    const serviceResponse = await this.service.createChurch(user, dto);

    if (!serviceResponse.status) {
      throw new HandledExceptionFilter(
        serviceResponse.error,
        serviceResponse.code,
      );
    }

    return serviceResponse.result;
  }
}
