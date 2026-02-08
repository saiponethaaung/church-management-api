import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { ProgramTypeRepo } from 'src/libs/prisma/repo/program-type.repo';
import { CreateProgramTypeData } from './dto/request/create-program-type.request';
import { ServiceResponse } from 'src/interfaces/response.interface';
import { ProgramTypeResponse } from './dto/response/program-type.response';
import { UpdateProgramTypeData } from './dto/request/update-program-type.request';
import { MessageResponse } from 'src/dto/response/message.response';
import { GetProgramTypesData } from './dto/request/get-program-types.request';
import { ProgramTypePaginationResponse } from './dto/response/program-type-pagination.response';

@Injectable()
export class ProgramTypeService {
  constructor(private readonly repo: ProgramTypeRepo) {}

  async createProgramType(
    user: User,
    dto: CreateProgramTypeData,
  ): Promise<ServiceResponse<ProgramTypeResponse>> {
    const { churchId, ...rest } = dto;
    const programType = await this.repo.create({
      data: {
        ...rest,
        ...(churchId && { chruch: { connect: { id: churchId } } }),
        createdByUser: { connect: { id: user.id } },
        updatedByUser: { connect: { id: user.id } },
      },
    });

    return { status: true, code: 201, result: new ProgramTypeResponse(programType) };
  }

  async updateProgramType(
    user: User,
    { id, ...dto }: UpdateProgramTypeData,
  ): Promise<ServiceResponse<ProgramTypeResponse>> {
    const programType = await this.repo.update({
      where: { id },
      data: {
        ...dto,
        updatedBy: user.id,
      },
    });

    return { status: true, code: 200, result: new ProgramTypeResponse(programType) };
  }

  async deleteProgramType(
    user: User,
    id: string,
  ): Promise<ServiceResponse<MessageResponse>> {
    await this.repo.delete(id);
    return { status: true, result: { message: 'Success' } };
  }

  async getProgramType(id: string): Promise<ServiceResponse<ProgramTypeResponse>> {
    const programType = await this.repo.findOne({
      where: { id },
    });

    if (!programType) {
      return { status: false, code: 404, error: { message: 'Program Type not found', errorCode: '404' } };
    }

    return { status: true, result: new ProgramTypeResponse(programType) };
  }

  async getProgramTypes({
    churchId,
    limit,
    page,
  }: GetProgramTypesData): Promise<ServiceResponse<ProgramTypePaginationResponse>> {
    const { data: programTypes, pagination } = await this.repo.paginate({
      where: { churchId },
      skip: page === 1 ? 0 : (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    return {
      status: true,
      result: {
        data: programTypes.map((pt) => new ProgramTypeResponse(pt)),
        pagination,
      },
    };
  }
}
