import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { DonationRepo } from 'src/libs/prisma/repo/donation.repo';
import { CreateDonationData } from './dto/request/create-donation.request';
import { ServiceResponse } from 'src/interfaces/response.interface';
import { DonationResponse } from './dto/response/donation.response';
import { UpdateDonationData } from './dto/request/update-donation.request';
import { MessageResponse } from 'src/dto/response/message.response';
import { GetDonationsData } from './dto/request/get-donations.request';
import { DonationPaginationResponse } from './dto/response/donation-pagination.response';

@Injectable()
export class DonationService {
  constructor(private readonly repo: DonationRepo) {}

  async createDonation(
    user: User,
    dto: CreateDonationData,
  ): Promise<ServiceResponse<DonationResponse>> {
    const { churchId, churchMemberId, householdId, donationTypeId, donationDate, ...rest } = dto;
    
    const donation = await this.repo.create({
      data: {
        ...rest,
        ...(donationDate && { donationDate: new Date(donationDate) }),
        church: { connect: { id: churchId } },
        ...(churchMemberId && { member: { connect: { id: churchMemberId } } }),
        ...(householdId && { household: { connect: { id: householdId } } }),
        donationType: { connect: { id: donationTypeId } },
        createdByUser: { connect: { id: user.id } },
        updatedByUser: { connect: { id: user.id } },
      },
      include: {
        member: true,
        household: true,
        donationType: true,
      },
    });

    return { status: true, code: 201, result: new DonationResponse(donation) };
  }

  async updateDonation(
    user: User,
    { id, donationTypeId, donationDate, ...dto }: UpdateDonationData,
  ): Promise<ServiceResponse<DonationResponse>> {
    const donation = await this.repo.update({
      where: { id },
      data: {
        ...dto,
        ...(donationDate && { donationDate: new Date(donationDate) }),
        ...(donationTypeId && { donationType: { connect: { id: donationTypeId } } }),
        updatedByUser: { connect: { id: user.id } },
      },
      include: {
        member: true,
        household: true,
        donationType: true,
      },
    });

    return { status: true, code: 200, result: new DonationResponse(donation) };
  }

  async deleteDonation(
    user: User,
    id: string,
  ): Promise<ServiceResponse<MessageResponse>> {
    await this.repo.delete(id);
    return { status: true, result: { message: 'Success' } };
  }

  async getDonation(id: string): Promise<ServiceResponse<DonationResponse>> {
    const donation = await this.repo.findOne({
      where: { id },
      include: {
        member: true,
        household: true,
        donationType: true,
      },
    });

    if (!donation) {
      return { status: false, code: 404, error: { message: 'Donation not found', errorCode: '404' } };
    }

    return { status: true, result: new DonationResponse(donation) };
  }

  async getDonations({
    churchId,
    memberId,
    householdId,
    donationTypeId,
    startDate,
    endDate,
    limit,
    page,
  }: GetDonationsData): Promise<ServiceResponse<DonationPaginationResponse>> {
    const where: any = {};
    
    if (churchId) where.churchId = churchId;
    if (memberId) where.churchMemberId = memberId;
    if (householdId) where.householdId = householdId;
    if (donationTypeId) where.donationTypeId = donationTypeId;
    
    if (startDate || endDate) {
      where.donationDate = {};
      if (startDate) where.donationDate.gte = new Date(startDate);
      if (endDate) where.donationDate.lte = new Date(endDate);
    }

    const { data: donations, pagination } = await this.repo.paginate({
      where,
      skip: page === 1 ? 0 : (page - 1) * limit,
      take: limit,
      orderBy: { donationDate: 'desc' },
      include: {
        member: true,
        household: true,
        donationType: true,
      },
    });

    return {
      status: true,
      result: {
        data: donations.map((d) => new DonationResponse(d)),
        pagination,
      },
    };
  }
}
