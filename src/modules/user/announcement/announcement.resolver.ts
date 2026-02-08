import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserGQLJwtAuthGuard } from 'src/libs/passport/user/user-gql-jwt.guard';
import { GQLCurrentUser } from 'src/decorators/gql-current-user.decorator';
import { HandledExceptionFilter } from 'src/filters/handled-exception/handled-exception.filter';
import { AnnouncementService } from './announcement.service';
import { CreateAnnouncementRequest } from './dto/request/create-announcement.request';
import { UpdateAnnouncementRequest } from './dto/request/update-announcement.request';
import { GetAnnouncementsRequest } from './dto/request/get-announcements.request';
import { AnnouncementResponse } from './dto/response/announcement.response';
import { AnnouncementPaginationResponse } from './dto/response/announcement-pagination.response';
import { MessageResponse } from 'src/dto/response/message.response';

@Resolver(() => AnnouncementResponse)
@UseGuards(UserGQLJwtAuthGuard)
export class AnnouncementResolver {
  constructor(private readonly service: AnnouncementService) {}

  @Mutation(() => AnnouncementResponse)
  async createAnnouncement(
    @GQLCurrentUser() user: User,
    @Args('createAnnouncement') dto: CreateAnnouncementRequest,
  ) {
    const serviceResponse = await this.service.createAnnouncement(user, dto);
    
    if (!serviceResponse.status) {
      throw new HandledExceptionFilter(
        serviceResponse.error,
        serviceResponse.code,
      );
    }

    return serviceResponse.result;
  }

  @Mutation(() => AnnouncementResponse)
  async updateAnnouncement(
    @GQLCurrentUser() user: User,
    @Args('updateAnnouncement') dto: UpdateAnnouncementRequest,
  ) {
    const serviceResponse = await this.service.updateAnnouncement(user, dto);
    
    if (!serviceResponse.status) {
      throw new HandledExceptionFilter(
        serviceResponse.error,
        serviceResponse.code,
      );
    }

    return serviceResponse.result;
  }

  @Mutation(() => MessageResponse)
  async deleteAnnouncement(@Args('id') id: string) {
    const serviceResponse = await this.service.deleteAnnouncement(id);
    
    if (!serviceResponse.status) {
      throw new HandledExceptionFilter(
        serviceResponse.error,
        serviceResponse.code,
      );
    }

    return serviceResponse.result;
  }

  @Query(() => AnnouncementResponse)
  async getAnnouncement(@Args('id') id: string) {
    const serviceResponse = await this.service.getAnnouncement(id);
    
    if (!serviceResponse.status) {
      throw new HandledExceptionFilter(
        serviceResponse.error,
        serviceResponse.code,
      );
    }

    return serviceResponse.result;
  }

  @Query(() => AnnouncementPaginationResponse)
  async getAnnouncements(
    @Args('query') dto: GetAnnouncementsRequest,
  ) {
    const serviceResponse = await this.service.getAnnouncements(dto);
    
    if (!serviceResponse.status) {
      throw new HandledExceptionFilter(
        serviceResponse.error,
        serviceResponse.code,
      );
    }

    return serviceResponse.result;
  }
}
