import { Injectable } from '@nestjs/common';
import { ChurchResponse } from './dto/response/church.response';
import { User } from '@prisma/client';
import { ServiceResponse } from 'src/interfaces/response.interface';
import { ChurchPaginationResponse } from './dto/response/chruch-pagination.response';
import { CreateChurchData } from './dto/request/create-church.request';
import { ChurchRepo } from 'src/libs/prisma/repo/church.repo';

@Injectable()
export class ChurchService {
  constructor(private readonly repo: ChurchRepo) {}

  async getChruches(
    user: User,
  ): Promise<ServiceResponse<ChurchPaginationResponse>> {
    const { data: churches, pagination } = await this.repo.paginate({
      where: { createdBy: user.id },
    });

    const churchResponse = churches.map((c) => new ChurchResponse(c));

    return { status: true, result: { data: churchResponse, pagination } };
  }

  async createChurch(
    user: User,
    dto: CreateChurchData,
  ): Promise<ServiceResponse<ChurchResponse>> {
    const church = await this.repo.create({
      data: {
        name: dto.name,
        createdByUser: { connect: { id: user.id } },
        updatedBy: user.id,
        country: { connect: { id: '1' } },
        address: { street: '' },
      },
    });

    return { status: true, result: new ChurchResponse(church) };
  }
}
