import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserGQLJwtAuthGuard } from 'src/libs/passport/user/user-gql-jwt.guard';
import { GQLCurrentUser } from 'src/decorators/gql-current-user.decorator';
import { HandledExceptionFilter } from 'src/filters/handled-exception/handled-exception.filter';
import { MessageResponse } from 'src/dto/response/message.response';
import { ProgramService } from './program.service';
import { ProgramResponse } from './dto/response/program.response';
import { ProgramPaginationResponse } from './dto/response/program-pagination.response';
import { CreateProgramRequest } from './dto/request/create-program.request';
import { UpdateProgramRequest } from './dto/request/update-program.request';
import { GetProgramsRequest } from './dto/request/get-programs.request';

@Resolver(() => ProgramResponse)
@UseGuards(UserGQLJwtAuthGuard)
export class ProgramResolver {
  constructor(private readonly service: ProgramService) {}

  @Mutation(() => ProgramResponse)
  async createProgram(
    @GQLCurrentUser() user: User,
    @Args('createProgram') dto: CreateProgramRequest,
  ) {
    const serviceResponse = await this.service.createProgram(user, dto);

    if (!serviceResponse.status) {
      throw new HandledExceptionFilter(
        serviceResponse.error,
        serviceResponse.code,
      );
    }

    return serviceResponse.result;
  }

  @Mutation(() => ProgramResponse)
  async updateProgram(
    @GQLCurrentUser() user: User,
    @Args('updateProgram') dto: UpdateProgramRequest,
  ) {
    const serviceResponse = await this.service.updateProgram(user, dto);

    if (!serviceResponse.status) {
      throw new HandledExceptionFilter(
        serviceResponse.error,
        serviceResponse.code,
      );
    }

    return serviceResponse.result;
  }

  @Mutation(() => MessageResponse)
  async deleteProgram(@Args('id') id: string) {
    // Note: ProgramService.deleteProgram doesn't take user currently, matching PT
    const serviceResponse = await this.service.deleteProgram(id);

    if (!serviceResponse.status) {
      throw new HandledExceptionFilter(
        serviceResponse.error,
        serviceResponse.code,
      );
    }

    return serviceResponse.result;
  }

  @Query(() => ProgramResponse)
  async getProgram(@Args('id') id: string) {
    const serviceResponse = await this.service.getProgram(id);

    if (!serviceResponse.status) {
      throw new HandledExceptionFilter(
        serviceResponse.error,
        serviceResponse.code,
      );
    }

    return serviceResponse.result;
  }

  @Query(() => ProgramPaginationResponse)
  async getPrograms(@Args('query') dto: GetProgramsRequest) {
    const serviceResponse = await this.service.getPrograms(dto);

    if (!serviceResponse.status) {
      throw new HandledExceptionFilter(
        serviceResponse.error,
        serviceResponse.code,
      );
    }

    return serviceResponse.result;
  }
}
