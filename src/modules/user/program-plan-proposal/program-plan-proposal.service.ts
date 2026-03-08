import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/libs/prisma/prisma.service';
import { ProgramPlanSectionProposalRepo } from 'src/libs/prisma/repo/program-plan-section-proposal.repo';
import { CreateProposalRequest } from './dto/request/create-proposal.request';
import { ProgramPlanSectionProposalResponse } from '../program-plan-section/dto/response/program-plan-section.response';
import { ServiceResponse } from 'src/interfaces/response.interface';
import { MessageResponse } from 'src/dto/response/message.response';

const PROPOSAL_INCLUDE = {
  proposedByUser: { select: { name: true } },
};

@Injectable()
export class ProgramPlanProposalService {
  constructor(
    private readonly repo: ProgramPlanSectionProposalRepo,
    private readonly prisma: PrismaService,
  ) {}

  async createProposal(
    user: User,
    dto: CreateProposalRequest,
  ): Promise<ServiceResponse<ProgramPlanSectionProposalResponse>> {
    const { sectionId, content } = dto;

    const proposal = await this.repo.create({
      data: {
        content: JSON.parse(content),
        section: { connect: { id: sectionId } },
        proposedByUser: { connect: { id: user.id } },
      },
      include: PROPOSAL_INCLUDE,
    });

    return { status: true, code: 201, result: new ProgramPlanSectionProposalResponse(proposal) };
  }

  async acceptProposal(
    proposalId: string,
  ): Promise<ServiceResponse<ProgramPlanSectionProposalResponse>> {
    // Get the proposal
    const proposal = await this.prisma.programPlanSectionProposal.findUnique({
      where: { id: proposalId },
    });

    if (!proposal) {
      return { status: false, code: 404, error: { message: 'Proposal not found', errorCode: '404' } };
    }

    // Mark all other proposals for this section as not accepted
    await this.prisma.programPlanSectionProposal.updateMany({
      where: { sectionId: proposal.sectionId, accepted: true },
      data: { accepted: false },
    });

    // Accept this proposal and copy its content to the section
    const [updatedProposal] = await this.prisma.$transaction([
      this.prisma.programPlanSectionProposal.update({
        where: { id: proposalId },
        data: { accepted: true },
        include: PROPOSAL_INCLUDE,
      }),
      this.prisma.programPlanSection.update({
        where: { id: proposal.sectionId },
        data: { content: proposal.content as any },
      }),
    ]);

    return { status: true, code: 200, result: new ProgramPlanSectionProposalResponse(updatedProposal) };
  }

  async deleteProposal(id: string): Promise<ServiceResponse<MessageResponse>> {
    await this.prisma.programPlanSectionProposal.delete({ where: { id } });
    return { status: true, code: 200, result: { message: 'Proposal deleted successfully' } };
  }

  async getSectionProposals(
    sectionId: string,
  ): Promise<ServiceResponse<ProgramPlanSectionProposalResponse[]>> {
    const proposals = await this.prisma.programPlanSectionProposal.findMany({
      where: { sectionId },
      include: PROPOSAL_INCLUDE,
      orderBy: { createdAt: 'desc' },
    });

    return {
      status: true,
      code: 200,
      result: proposals.map((p) => new ProgramPlanSectionProposalResponse(p)),
    };
  }
}
