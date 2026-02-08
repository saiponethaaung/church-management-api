import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, registerEnumType } from '@nestjs/graphql';
import { UserGQLJwtAuthGuard } from 'src/libs/passport/user/user-gql-jwt.guard';
import { DonationService } from './donation.service';
import { DonationResponse } from './dto/response/donation.response';
import { GQLCurrentUser } from 'src/decorators/gql-current-user.decorator';
import { User } from '@prisma/client';
import { CreateDonationData } from './dto/request/create-donation.request';
import { HandledExceptionFilter } from 'src/filters/handled-exception/handled-exception.filter';
import { UpdateDonationData } from './dto/request/update-donation.request';
import { MessageResponse } from 'src/dto/response/message.response';
import { DonationPaginationResponse } from './dto/response/donation-pagination.response';
import { GetDonationsData } from './dto/request/get-donations.request';

import { PaymentMethod } from '@prisma/client';

registerEnumType(PaymentMethod, {
  name: 'PaymentMethod',
});

@UseGuards(UserGQLJwtAuthGuard)
@Resolver(() => DonationResponse)
export class DonationResolver {
  constructor(private readonly service: DonationService) {}

  @Mutation(() => DonationResponse)
  async createDonation(
    @GQLCurrentUser() user: User,
    @Args('createDonation') dto: CreateDonationData,
  ) {
    const serviceResponse = await this.service.createDonation(user, dto);

    if (!serviceResponse.status) {
      throw new HandledExceptionFilter(
        serviceResponse.error,
        serviceResponse.code,
      );
    }

    return serviceResponse.result;
  }

  @Mutation(() => DonationResponse)
  async updateDonation(
    @GQLCurrentUser() user: User,
    @Args('updateDonation') dto: UpdateDonationData,
  ) {
    const serviceResponse = await this.service.updateDonation(user, dto);

    if (!serviceResponse.status) {
      throw new HandledExceptionFilter(
        serviceResponse.error,
        serviceResponse.code,
      );
    }

    return serviceResponse.result;
  }

  @Mutation(() => MessageResponse)
  async deleteDonation(
    @GQLCurrentUser() user: User,
    @Args('id') id: string,
  ) {
    const serviceResponse = await this.service.deleteDonation(user, id);

    if (!serviceResponse.status) {
      throw new HandledExceptionFilter(
        serviceResponse.error,
        serviceResponse.code,
      );
    }

    return serviceResponse.result;
  }

  @Query(() => DonationResponse, { name: 'getDonation' })
  async getDonation(@Args('id') id: string) {
    const serviceResponse = await this.service.getDonation(id);

    if (!serviceResponse.status) {
      throw new HandledExceptionFilter(
        serviceResponse.error,
        serviceResponse.code,
      );
    }

    return serviceResponse.result;
  }

  @Query(() => DonationPaginationResponse, { name: 'getDonations' })
  async getDonations(
    @Args('query') query: GetDonationsData,
  ) {
    const serviceResponse = await this.service.getDonations(query);

    if (!serviceResponse.status) {
      throw new HandledExceptionFilter(
        serviceResponse.error,
        serviceResponse.code,
      );
    }

    return serviceResponse.result;
  }
}
