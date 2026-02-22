import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { MemberTypeRepo } from 'src/libs/prisma/repo/member-type.repo';
import { CreateMemberTypeData } from './dto/request/create-member-type.request';
import { ServiceResponse } from 'src/interfaces/response.interface';
import { MemberTypeResponse } from './dto/response/member-type.response';
import { UpdateMemberTypeData } from './dto/request/update-member-type.request';
import { MessageResponse } from 'src/dto/response/message.response';
import { GetMemberTypesData } from './dto/request/get-member-types.request';
import { MemberTypePaginationResponse } from './dto/response/member-type-pagination.response';

@Injectable()
export class MemberTypeService {
  constructor(private readonly repo: MemberTypeRepo) {}

  async createMemberType(
    user: User,
    dto: CreateMemberTypeData,
  ): Promise<ServiceResponse<MemberTypeResponse>> {
    const { churchId, ...rest } = dto;
    const memberType = await this.repo.create({
      data: {
        ...rest,
        ...(churchId && { church: { connect: { id: churchId } } }),
        createdByUser: { connect: { id: user.id } },
        updatedByUser: { connect: { id: user.id } },
      },
    });

    return { status: true, code: 201, result: new MemberTypeResponse(memberType) };
  }

  async updateMemberType(
    user: User,
    { id, ...dto }: UpdateMemberTypeData,
  ): Promise<ServiceResponse<MemberTypeResponse>> {
    const memberType = await this.repo.update({
      where: { id },
      data: {
        ...dto,
        updatedBy: user.id,
      },
    });

    return { status: true, code: 200, result: new MemberTypeResponse(memberType) };
  }

  async deleteMemberType(
    user: User,
    id: string,
  ): Promise<ServiceResponse<MessageResponse>> {
    await this.repo.delete(id);
    return { status: true, result: { message: 'Success' } };
  }

  async getMemberType(id: string): Promise<ServiceResponse<MemberTypeResponse>> {
    const memberType = await this.repo.findOne({
      where: { id },
    });

    if (!memberType) {
      return { status: false, code: 404, error: { message: 'Member Type not found', errorCode: '404' } };
    }

    return { status: true, result: new MemberTypeResponse(memberType) };
  }

  async getMemberTypes({
    churchId,
    limit,
    page,
  }: GetMemberTypesData): Promise<ServiceResponse<MemberTypePaginationResponse>> {
    const { data: memberTypes, pagination } = await this.repo.paginate({
      where: { churchId },
      skip: page === 1 ? 0 : (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    return {
      status: true,
      result: {
        data: memberTypes.map((pt) => new MemberTypeResponse(pt)),
        pagination,
      },
    };
  }
}
