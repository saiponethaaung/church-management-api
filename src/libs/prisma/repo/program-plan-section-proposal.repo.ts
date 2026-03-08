import { Injectable } from '@nestjs/common';
import { BaseRepo } from './base.repo';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProgramPlanSectionProposalRepo extends BaseRepo<
  Prisma.ProgramPlanSectionProposalDelegate<DefaultArgs>,
  Prisma.ProgramPlanSectionProposalDelegate
> {
  constructor(prisma: PrismaService) {
    super('ProgramPlanSectionProposal');
    this.prisma = prisma;
  }
}
