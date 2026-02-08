import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { DonationTypeRepo } from 'src/libs/prisma/repo/donation-type.repo';
import { CreateDonationTypeData } from './dto/request/create-donation-type.request';
import { ServiceResponse } from 'src/interfaces/response.interface';
import { DonationTypeResponse } from './dto/response/donation-type.response';
import { UpdateDonationTypeData } from './dto/request/update-donation-type.request';
import { MessageResponse } from 'src/dto/response/message.response';
import { GetDonationTypesData } from './dto/request/get-donation-types.request';
import { DonationTypePaginationResponse } from './dto/response/donation-type-pagination.response';

@Injectable()
export class DonationTypeService {
  constructor(private readonly repo: DonationTypeRepo) {}

  async createDonationType(
    user: User,
    dto: CreateDonationTypeData,
  ): Promise<ServiceResponse<DonationTypeResponse>> {
    const { churchId, ...rest } = dto;
    const donationType = await this.repo.create({
      data: {
        ...rest,
        ...(churchId && { church: { connect: { id: churchId } } }),
        createdByUser: { connect: { id: user.id } },
        updatedByUser: { connect: { id: user.id } },
      },
    });

    return { status: true, code: 201, result: new DonationTypeResponse(donationType) };
  }

  async updateDonationType(
    user: User,
    { id, ...dto }: UpdateDonationTypeData,
  ): Promise<ServiceResponse<DonationTypeResponse>> {
    const donationType = await this.repo.update({
      where: { id },
      data: {
        ...dto,
        updatedBy: user.id,
      },
    });

    return { status: true, code: 200, result: new DonationTypeResponse(donationType) };
  }

  async deleteDonationType(
    user: User,
    id: string,
  ): Promise<ServiceResponse<MessageResponse>> {
    await this.repo.delete(id);
    return { status: true, result: { message: 'Success' } };
  }

  async getDonationType(id: string): Promise<ServiceResponse<DonationTypeResponse>> {
    const donationType = await this.repo.findOne({
      where: { id },
    });

    if (!donationType) {
      return { status: false, code: 404, error: { message: 'Donation Type not found', errorCode: '404' } };
    }

    return { status: true, result: new DonationTypeResponse(donationType) };
  }

  async getDonationTypes({
    churchId,
    limit,
    page,
  }: GetDonationTypesData): Promise<ServiceResponse<DonationTypePaginationResponse>> {
    const { data: donationTypes, pagination } = await this.repo.paginate({
      where: { churchId },
      skip: page === 1 ? 0 : (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    return {
      status: true,
      result: {
        data: donationTypes.map((dt) => new DonationTypeResponse(dt)),
        pagination,
      },
    };
  }
}
