import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/libs/prisma/prisma.service';
import { ProgramPlanSectionRepo } from 'src/libs/prisma/repo/program-plan-section.repo';
import { CreateProgramPlanSectionRequest } from './dto/request/create-program-plan-section.request';
import { UpdateProgramPlanSectionRequest } from './dto/request/update-program-plan-section.request';
import { ReorderProgramPlanSectionsRequest } from './dto/request/reorder-program-plan-sections.request';
import { ProgramPlanSectionResponse } from './dto/response/program-plan-section.response';
import { ServiceResponse } from 'src/interfaces/response.interface';
import { MessageResponse } from 'src/dto/response/message.response';

const SECTION_INCLUDE = {
  proposals: {
    include: { proposedByUser: { select: { name: true } } },
    orderBy: { createdAt: 'desc' as const },
  },
};

@Injectable()
export class ProgramPlanSectionService {
  constructor(
    private readonly repo: ProgramPlanSectionRepo,
    private readonly prisma: PrismaService,
  ) {}

  async createSection(
    dto: CreateProgramPlanSectionRequest,
  ): Promise<ServiceResponse<ProgramPlanSectionResponse>> {
    const { programPlanId, content, ...data } = dto;

    // Get the next sort order if not provided
    let sortOrder = dto.sortOrder;
    if (sortOrder === undefined || sortOrder === null) {
      const maxSection = await this.prisma.programPlanSection.findFirst({
        where: { programPlanId },
        orderBy: { sortOrder: 'desc' },
        select: { sortOrder: true },
      });
      sortOrder = (maxSection?.sortOrder ?? -1) + 1;
    }

    const section = await this.repo.create({
      data: {
        ...data,
        sortOrder,
        content: content ? JSON.parse(content) : null,
        programPlan: { connect: { id: programPlanId } },
      },
      include: SECTION_INCLUDE,
    });

    return { status: true, code: 201, result: new ProgramPlanSectionResponse(section) };
  }

  async updateSection(
    dto: UpdateProgramPlanSectionRequest,
  ): Promise<ServiceResponse<ProgramPlanSectionResponse>> {
    const { id, programPlanId, content, ...data } = dto;

    const updateData: any = { ...data };
    if (content !== undefined) {
      updateData.content = content ? JSON.parse(content) : null;
    }

    const section = await this.repo.update({
      where: { id },
      data: updateData,
      include: SECTION_INCLUDE,
    });

    return { status: true, code: 200, result: new ProgramPlanSectionResponse(section) };
  }

  async deleteSection(id: string): Promise<ServiceResponse<MessageResponse>> {
    await this.prisma.programPlanSection.delete({ where: { id } });
    return { status: true, code: 200, result: { message: 'Section deleted successfully' } };
  }

  async getSections(programPlanId: string): Promise<ServiceResponse<ProgramPlanSectionResponse[]>> {
    const sections = await this.prisma.programPlanSection.findMany({
      where: { programPlanId },
      include: SECTION_INCLUDE,
      orderBy: { sortOrder: 'asc' },
    });

    return {
      status: true,
      code: 200,
      result: sections.map((s) => new ProgramPlanSectionResponse(s)),
    };
  }

  async reorderSections(
    dto: ReorderProgramPlanSectionsRequest,
  ): Promise<ServiceResponse<ProgramPlanSectionResponse[]>> {
    const { programPlanId, sectionIds } = dto;

    await this.prisma.$transaction(
      sectionIds.map((id, index) =>
        this.prisma.programPlanSection.update({
          where: { id },
          data: { sortOrder: index },
        }),
      ),
    );

    return this.getSections(programPlanId);
  }
}
