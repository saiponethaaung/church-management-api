import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { ProgramPlanRepo } from 'src/libs/prisma/repo/program-plan.repo';
import { CreateProgramPlanRequest } from './dto/request/create-program-plan.request';
import { UpdateProgramPlanRequest } from './dto/request/update-program-plan.request';
import { GetProgramPlansRequest } from './dto/request/get-program-plans.request';
import { ProgramPlanResponse } from './dto/response/program-plan.response';
import { ProgramPlanPaginationResponse } from './dto/response/program-plan-pagination.response';
import { ServiceResponse } from 'src/interfaces/response.interface';
import { MessageResponse } from 'src/dto/response/message.response';
import { PaginationResponse } from 'src/dto/response/pagination.response';
import { PrismaService } from 'src/libs/prisma/prisma.service';

@Injectable()
export class ProgramPlanService {
  constructor(
    private readonly repo: ProgramPlanRepo,
    private readonly prisma: PrismaService,
  ) {}

  async createProgramPlan(
    user: User,
    dto: CreateProgramPlanRequest,
  ): Promise<ServiceResponse<ProgramPlanResponse>> {
    const { programId, attachments, content, ...data } = dto;
    
    const programPlan = await this.repo.create({
      data: {
        ...(data as any),
        content: content ? JSON.parse(content) : null,
        program: { connect: { id: programId } },
        createdByUser: { connect: { id: user.id } },
        updatedByUser: { connect: { id: user.id } },
        attachments: {
          create: attachments?.map((a) => ({
            url: a.url,
            name: a.name,
            type: a.type,
          })),
        },
      },
      include: { attachments: true },
    });

    return { status: true, code: 201, result: new ProgramPlanResponse(programPlan) };
  }

  async updateProgramPlan(
    user: User,
    dto: UpdateProgramPlanRequest,
  ): Promise<ServiceResponse<ProgramPlanResponse>> {
    const { id, attachments, content, ...data } = dto;
    
    // For attachments in update, for simplicity we'll just replace them if provided
    // In a more complex app, you'd want to handle individual add/remove
    const updateData: any = {
      ...data,
      updatedByUser: { connect: { id: user.id } },
    };

    if (content !== undefined) {
      updateData.content = content ? JSON.parse(content) : null;
    }

    if (attachments) {
      updateData.attachments = {
        deleteMany: {},
        create: attachments.map((a) => ({
          url: a.url,
          name: a.name,
          type: a.type,
        })),
      };
    }

    const programPlan = await this.repo.update({
      where: { id },
      data: updateData,
      include: { attachments: true },
    });

    return { status: true, code: 200, result: new ProgramPlanResponse(programPlan) };
  }

  async deleteProgramPlan(id: string): Promise<ServiceResponse<MessageResponse>> {
    await this.prisma.$transaction([
      this.prisma.programPlanAttachment.deleteMany({
        where: { programPlanId: id },
      }),
      this.prisma.programPlan.delete({
        where: { id },
      }),
    ]);
    return {
      status: true,
      code: 200,
      result: { message: 'Program plan deleted successfully' },
    };
  }

  async getProgramPlan(id: string): Promise<ServiceResponse<ProgramPlanResponse>> {
    const programPlan = await this.repo.findOne({
      where: { id },
      include: { attachments: true },
    });
    if (!programPlan) {
      return { status: false, code: 404, error: { message: 'Program plan not found', errorCode: '404' } };
    }
    return { status: true, code: 200, result: new ProgramPlanResponse(programPlan) };
  }

  async getProgramPlans(
    dto: GetProgramPlansRequest,
  ): Promise<ServiceResponse<ProgramPlanPaginationResponse>> {
    const { programId, limit, page, isPast } = dto;
    
    const now = new Date();
    const where: any = { programId };
    
    if (isPast !== undefined) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      where.date = isPast ? { lt: today } : { gte: today };
      if (!isPast) {
        where.OR = [
          { date: { gte: today } },
          { date: null }
        ];
        delete where.date;
      }
    }

    const { data, pagination } = await this.repo.paginate({
      where,
      include: { attachments: true },
      take: limit,
      skip: page === 1 ? 0 : (page - 1) * limit,
      orderBy: { date: isPast === false ? 'asc' : 'desc' },
    });

    return {
      status: true,
      code: 200,
      result: {
        data: data.map((p) => new ProgramPlanResponse(p)),
        pagination: new PaginationResponse(pagination),
      },
    };
  }
}
