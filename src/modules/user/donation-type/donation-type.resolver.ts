import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserGQLJwtAuthGuard } from 'src/libs/passport/user/user-gql-jwt.guard';
import { DonationTypeService } from './donation-type.service';
import { DonationTypeResponse } from './dto/response/donation-type.response';
import { GQLCurrentUser } from 'src/decorators/gql-current-user.decorator';
import { User } from '@prisma/client';
import { CreateDonationTypeData } from './dto/request/create-donation-type.request';
import { HandledExceptionFilter } from 'src/filters/handled-exception/handled-exception.filter';
import { UpdateDonationTypeData } from './dto/request/update-donation-type.request';
import { MessageResponse } from 'src/dto/response/message.response';
import { DonationTypePaginationResponse } from './dto/response/donation-type-pagination.response';
import { GetDonationTypesData } from './dto/request/get-donation-types.request';

@UseGuards(UserGQLJwtAuthGuard)
@Resolver(() => DonationTypeResponse)
export class DonationTypeResolver {
  constructor(private readonly service: DonationTypeService) {}

  @Mutation(() => DonationTypeResponse)
  async createDonationType(
    @GQLCurrentUser() user: User,
    @Args('createDonationType') dto: CreateDonationTypeData,
  ) {
    const serviceResponse = await this.service.createDonationType(user, dto);

    if (!serviceResponse.status) {
      throw new HandledExceptionFilter(
        serviceResponse.error,
        serviceResponse.code,
      );
    }

    return serviceResponse.result;
  }

  @Mutation(() => DonationTypeResponse)
  async updateDonationType(
    @GQLCurrentUser() user: User,
    @Args('updateDonationType') dto: UpdateDonationTypeData,
  ) {
    const serviceResponse = await this.service.updateDonationType(user, dto);

    if (!serviceResponse.status) {
      throw new HandledExceptionFilter(
        serviceResponse.error,
        serviceResponse.code,
      );
    }

    return serviceResponse.result;
  }

  @Mutation(() => MessageResponse)
  async deleteDonationType(
    @GQLCurrentUser() user: User,
    @Args('id') id: string,
  ) {
    const serviceResponse = await this.service.deleteDonationType(user, id);

    if (!serviceResponse.status) {
      throw new HandledExceptionFilter(
        serviceResponse.error,
        serviceResponse.code,
      );
    }

    return serviceResponse.result;
  }

  @Query(() => DonationTypeResponse, { name: 'getDonationType' })
  async getDonationType(@Args('id') id: string) {
    const serviceResponse = await this.service.getDonationType(id);

    if (!serviceResponse.status) {
      throw new HandledExceptionFilter(
        serviceResponse.error,
        serviceResponse.code,
      );
    }

    return serviceResponse.result;
  }

  @Query(() => DonationTypePaginationResponse, { name: 'getDonationTypes' })
  async getDonationTypes(
    @Args('query') query: GetDonationTypesData,
  ) {
    const serviceResponse = await this.service.getDonationTypes(query);

    if (!serviceResponse.status) {
      throw new HandledExceptionFilter(
        serviceResponse.error,
        serviceResponse.code,
      );
    }

    return serviceResponse.result;
  }
}
