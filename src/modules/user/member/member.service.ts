import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { ChurchMemberRepo } from 'src/libs/prisma/repo/church-member.repo';
import { CreateMemberData } from './dto/request/create-member.request';
import { ServiceResponse } from 'src/interfaces/response.interface';
import { MemberResponse } from './dto/response/member.response';
import { GetMembersData } from './dto/request/get-members.request';
import { MemberPaginationResponse } from './dto/response/member-pagination.response';

@Injectable()
export class MemberService {
  constructor(private readonly repo: ChurchMemberRepo) {}

  async createMember(
    user: User,
    { churchId, ...dto }: CreateMemberData,
  ): Promise<ServiceResponse<MemberResponse>> {
    //TODO: find user id if email is provided

    const member = await this.repo.create({
      data: {
        ...dto,
        church: { connect: { id: churchId } },
        updatedBy: user.id,
        createdByUser: { connect: { id: user.id } },
      },
    });

    return { status: true, code: 201, result: new MemberResponse(member) };
  }

  async getMembers({
    churchId,
    limit,
    page,
  }: GetMembersData): Promise<ServiceResponse<MemberPaginationResponse>> {
    const { data: members, pagination } = await this.repo.paginate({
      where: { churchId },
      skip: page === 1 ? 0 : page * limit,
      take: limit,
    });

    const data = members.map((m) => new MemberResponse(m));

    return { status: true, result: { data, pagination } };
  }
}
