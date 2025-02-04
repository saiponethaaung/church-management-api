import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserAuthService } from './auth.service';
import { UserRegisterDTO } from './dto/request/register.dto';
import { HandledExceptionFilter } from 'src/filters/handled-exception/handled-exception.filter';
import { UserLoginDTO } from './dto/request/login.dto';
import { UserResponse } from './dto/response/user.response';
import { AccessTokenResponse } from 'src/dto/response/token.response';
import { UseGuards } from '@nestjs/common';
import { UserGQLJwtAuthGuard } from 'src/libs/passport/user/user-gql-jwt.guard';
import { GQLCurrentUser } from 'src/decorators/gql-current-user.decorator';
import { User } from '@prisma/client';

@Resolver(() => UserResponse)
export class UserAuthResolver {
  constructor(private readonly service: UserAuthService) {}

  @Mutation(() => UserResponse)
  async register(@Args('registerData') dto: UserRegisterDTO) {
    const servicesResponse = await this.service.register(dto);

    if (!servicesResponse.status) {
      throw new HandledExceptionFilter(
        servicesResponse.error,
        servicesResponse.code,
      );
    }

    return servicesResponse.result;
  }

  @Mutation(() => AccessTokenResponse)
  async login(@Args('loginData') dto: UserLoginDTO) {
    console.log('-'.repeat(30));
    console.log(dto);
    const servicesResponse = await this.service.login(dto);

    if (!servicesResponse.status) {
      throw new HandledExceptionFilter(
        servicesResponse.error,
        servicesResponse.code,
      );
    }

    return servicesResponse.result;
  }

  @UseGuards(UserGQLJwtAuthGuard)
  @Query(() => UserResponse)
  async getProfile(@GQLCurrentUser() user: User): Promise<UserResponse> {
    const res = new UserResponse(user);

    return res;
  }
}
