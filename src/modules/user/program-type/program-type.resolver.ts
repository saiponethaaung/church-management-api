import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserGQLJwtAuthGuard } from 'src/libs/passport/user/user-gql-jwt.guard';
import { ProgramTypeService } from './program-type.service';
import { ProgramTypeResponse } from './dto/response/program-type.response';
import { GQLCurrentUser } from 'src/decorators/gql-current-user.decorator';
import { User } from '@prisma/client';
import { CreateProgramTypeData } from './dto/request/create-program-type.request';
import { HandledExceptionFilter } from 'src/filters/handled-exception/handled-exception.filter';
import { UpdateProgramTypeData } from './dto/request/update-program-type.request';
import { MessageResponse } from 'src/dto/response/message.response';
import { ProgramTypePaginationResponse } from './dto/response/program-type-pagination.response';
import { GetProgramTypesData } from './dto/request/get-program-types.request';

@UseGuards(UserGQLJwtAuthGuard)
@Resolver(() => ProgramTypeResponse)
export class ProgramTypeResolver {
  constructor(private readonly service: ProgramTypeService) {}

  @Mutation(() => ProgramTypeResponse)
  async createProgramType(
    @GQLCurrentUser() user: User,
    @Args('createProgramType') dto: CreateProgramTypeData,
  ) {
    const serviceResponse = await this.service.createProgramType(user, dto);

    if (!serviceResponse.status) {
      throw new HandledExceptionFilter(
        serviceResponse.error,
        serviceResponse.code,
      );
    }

    return serviceResponse.result;
  }

  @Mutation(() => ProgramTypeResponse)
  async updateProgramType(
    @GQLCurrentUser() user: User,
    @Args('updateProgramType') dto: UpdateProgramTypeData,
  ) {
    const serviceResponse = await this.service.updateProgramType(user, dto);

    if (!serviceResponse.status) {
      throw new HandledExceptionFilter(
        serviceResponse.error,
        serviceResponse.code,
      );
    }

    return serviceResponse.result;
  }

  @Mutation(() => MessageResponse)
  async deleteProgramType(
    @GQLCurrentUser() user: User,
    @Args('id') id: string,
  ) {
    const serviceResponse = await this.service.deleteProgramType(user, id);

    if (!serviceResponse.status) {
      throw new HandledExceptionFilter(
        serviceResponse.error,
        serviceResponse.code,
      );
    }

    return serviceResponse.result;
  }

  @Query(() => ProgramTypeResponse, { name: 'getProgramType' })
  async getProgramType(@Args('id') id: string) {
    const serviceResponse = await this.service.getProgramType(id);

    if (!serviceResponse.status) {
      throw new HandledExceptionFilter(
        serviceResponse.error,
        serviceResponse.code,
      );
    }

    return serviceResponse.result;
  }

  @Query(() => ProgramTypePaginationResponse, { name: 'getProgramTypes' })
  async getProgramTypes(
    @Args('query') query: GetProgramTypesData,
  ) {
    const serviceResponse = await this.service.getProgramTypes(query);

    if (!serviceResponse.status) {
      throw new HandledExceptionFilter(
        serviceResponse.error,
        serviceResponse.code,
      );
    }

    return serviceResponse.result;
  }
}
