import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { ProgramRepo } from 'src/libs/prisma/repo/program.repo';
import { CreateProgramRequest } from './dto/request/create-program.request';
import { UpdateProgramRequest } from './dto/request/update-program.request';
import { GetProgramsRequest } from './dto/request/get-programs.request';
import { ProgramResponse } from './dto/response/program.response';
import { ProgramPaginationResponse } from './dto/response/program-pagination.response';
import { ServiceResponse } from 'src/interfaces/response.interface';
import { MessageResponse } from 'src/dto/response/message.response';
import { PaginationResponse } from 'src/dto/response/pagination.response';
import { PrismaService } from 'src/libs/prisma/prisma.service';
import { ProgramPlanRepo } from 'src/libs/prisma/repo/program-plan.repo';

@Injectable()
export class ProgramService {
  constructor(
    private readonly repo: ProgramRepo,
    private readonly programPlanRepo: ProgramPlanRepo,
    private readonly prisma: PrismaService,
  ) {}

  async createProgram(
    user: User,
    dto: CreateProgramRequest,
  ): Promise<ServiceResponse<ProgramResponse>> {
    const { churchId, programTypeId, leaderId, ...data } = dto;
    const program = await this.repo.create({
      data: {
        ...data,
        church: { connect: { id: churchId } },
        programType: { connect: { id: programTypeId } },
        createdByUser: { connect: { id: user.id } },
        updatedByUser: { connect: { id: user.id } },
        ...(leaderId && { leader: { connect: { id: leaderId } } }),
      },
      include: { leader: true, programType: true },
    });

    if (!program.isRecurring) {
      await this.programPlanRepo.create({
        data: {
          programId: program.id,
          title: program.name,
          date: program.startDate || new Date(),
          createdBy: user.id,
          updatedBy: user.id,
        },
      });
    }

    return { status: true, code: 201, result: new ProgramResponse(program) };
  }

  async updateProgram(
    user: User,
    dto: UpdateProgramRequest,
  ): Promise<ServiceResponse<ProgramResponse>> {
    const { id, churchId, programTypeId, leaderId, ...data } = dto;
    const program = await this.repo.update({
      where: { id },
      data: {
        ...data,
        updatedByUser: { connect: { id: user.id } },
        ...(churchId && { church: { connect: { id: churchId } } }),
        ...(programTypeId && { programType: { connect: { id: programTypeId } } }),
        ...(leaderId !== undefined && {
          leader: leaderId ? { connect: { id: leaderId } } : { disconnect: true },
        }),
      },
      include: { leader: true, programType: true },
    });

    return { status: true, code: 200, result: new ProgramResponse(program) };
  }

  async deleteProgram(id: string): Promise<ServiceResponse<MessageResponse>> {
    const plans = await this.prisma.programPlan.findMany({
      where: { programId: id },
      select: { id: true },
    });
    const planIds = plans.map((p) => p.id);

    await this.prisma.$transaction([
      this.prisma.programPlanAttachment.deleteMany({
        where: { programPlanId: { in: planIds } },
      }),
      this.prisma.programPlan.deleteMany({
        where: { programId: id },
      }),
      this.prisma.announcement.deleteMany({
        where: { programId: id },
      }),
      this.prisma.program.delete({
        where: { id },
      }),
    ]);

    return {
      status: true,
      code: 200,
      result: { message: 'Program deleted successfully' },
    };
  }

  async getProgram(id: string): Promise<ServiceResponse<ProgramResponse>> {
    const program = await this.repo.findOne({
      where: { id },
      include: {
        leader: true,
        programType: true,
        plans: { take: 10, orderBy: { date: 'desc' } },
      },
    });
    if (!program) {
      return {
        status: false,
        code: 404,
        error: { message: 'Program not found', errorCode: '404' },
      };
    }
    return { status: true, code: 200, result: new ProgramResponse(program) };
  }

  async getPrograms(
    dto: GetProgramsRequest,
  ): Promise<ServiceResponse<ProgramPaginationResponse>> {
    const { churchId, programTypeId, limit, page } = dto;
    const where = {
      churchId,
      ...(programTypeId && { programTypeId }),
    };

    const { data, pagination } = await this.repo.paginate({
      where,
      include: {
        leader: true,
        programType: true,
      },
      take: limit,
      skip: page === 1 ? 0 : (page - 1) * limit,
      orderBy: { createdAt: 'desc' },
    });

    return {
      status: true,
      code: 200,
      result: {
        data: data.map((p) => new ProgramResponse(p)),
        pagination: new PaginationResponse(pagination),
      },
    };
  }
}
