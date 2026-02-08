import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { HouseholdRepo } from 'src/libs/prisma/repo/household.repo';
import { CreateHouseholdData } from './dto/request/create-household.request';
import { ServiceResponse } from 'src/interfaces/response.interface';
import { HouseholdResponse } from './dto/response/household.response';
import { UpdateHouseholdData } from './dto/request/update-household.request';
import { MessageResponse } from 'src/dto/response/message.response';
import { GetHouseholdsData } from './dto/request/get-households.request';
import { HouseholdPaginationResponse } from './dto/response/household-pagination.response';
import { Prisma } from '@prisma/client';

@Injectable()
export class HouseholdService {
  constructor(private readonly repo: HouseholdRepo) {}

  async createHousehold(
    user: User,
    { address, memberIds, ...dto }: CreateHouseholdData,
  ): Promise<ServiceResponse<HouseholdResponse>> {
    const household = await this.repo.create({
      data: {
        ...dto,
        ...(address && { address: { address } }),
        ...(memberIds && {
          members: {
            connect: memberIds.map((id) => ({ id })),
          },
        }),
        updatedBy: user.id,
        createdBy: user.id,
      },
      include: { members: true },
    });

    return { status: true, code: 201, result: new HouseholdResponse(household) };
  }

  async updateHousehold(
    user: User,
    { id, address, memberIds, ...dto }: UpdateHouseholdData,
  ): Promise<ServiceResponse<HouseholdResponse>> {
    const household = await this.repo.update({
      where: { id },
      data: {
        ...dto,
        ...(address !== undefined && { address: address ? { address } : Prisma.JsonNull }),
        ...(memberIds && {
          members: {
            set: memberIds.map((id) => ({ id })),
          },
        }),
        updatedBy: user.id,
      },
      include: { members: true },
    });

    return { status: true, code: 200, result: new HouseholdResponse(household) };
  }

  async deleteHousehold(
    user: User,
    id: string,
  ): Promise<ServiceResponse<MessageResponse>> {
    await this.repo.delete(id);
    return { status: true, result: { message: 'Success' } };
  }

  async getHousehold(id: string): Promise<ServiceResponse<HouseholdResponse>> {
    const household = await this.repo.findOne({
      where: { id },
      include: { members: true },
    });

    if (!household) {
      return { status: false, code: 404, error: { message: 'Household not found', errorCode: '404' } };
    }

    return { status: true, result: new HouseholdResponse(household) };
  }

  async getHouseholds({
    churchId,
    limit,
    page,
  }: GetHouseholdsData): Promise<ServiceResponse<HouseholdPaginationResponse>> {
    const { data: households, pagination } = await this.repo.paginate({
      where: { churchId },
      skip: page === 1 ? 0 : (page - 1) * limit,
      take: limit,
      include: { members: true },
      orderBy: { createdAt: 'desc' },
    });

    return {
      status: true,
      result: {
        data: households.map((h) => new HouseholdResponse(h)),
        pagination,
      },
    };
  }
}
