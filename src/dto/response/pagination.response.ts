import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationInterface } from '../../interfaces/response.interface';

@ObjectType({ description: 'paginationResponse' })
export class PaginationResponse {
  constructor(paginationData: PaginationInterface) {
    this.totalCount = paginationData.totalCount;
    this.totalPage = paginationData.totalPage;
    this.currentPage = paginationData.currentPage;
    this.limit = paginationData.limit;
  }

  @Field()
  totalCount: number;

  @Field()
  totalPage: number;

  @Field()
  currentPage: number;

  @Field()
  limit: number;
}
