import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { ChurchService } from './church.service';
import { UseGuards } from '@nestjs/common';
import { UserGQLJwtAuthGuard } from 'src/libs/passport/user/user-gql-jwt.guard';
import { ChurchResponse } from './dto/response/church.response';
import { GQLCurrentUser } from 'src/decorators/gql-current-user.decorator';
import { User } from '@prisma/client';

@UseGuards(UserGQLJwtAuthGuard)
@Resolver()
export class ChurchResolver {
  constructor(private readonly service: ChurchService) {}

  @Query(() => ChurchResponse)
  getChurch(@GQLCurrentUser() user: User) {
    console.log('Loggedin user is', user);
    let church = new ChurchResponse();
    church.id = '123';
    return church;
  }

  @Mutation(() => ChurchResponse)
  createChurch() {}
}
