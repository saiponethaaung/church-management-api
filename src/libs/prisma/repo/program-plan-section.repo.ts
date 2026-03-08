import { Injectable } from '@nestjs/common';
import { BaseRepo } from './base.repo';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProgramPlanSectionRepo extends BaseRepo<
  Prisma.ProgramPlanSectionDelegate<DefaultArgs>,
  Prisma.ProgramPlanSectionDelegate
> {
  constructor(prisma: PrismaService) {
    super('ProgramPlanSection');
    this.prisma = prisma;
  }
}
