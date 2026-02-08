import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationResponse } from 'src/dto/response/pagination.response';
import { AnnouncementResponse } from './announcement.response';

@ObjectType()
export class AnnouncementPaginationResponse {
  @Field(() => [AnnouncementResponse])
  data: AnnouncementResponse[];

  @Field(() => PaginationResponse)
  pagination: PaginationResponse;
}
