import { Injectable } from '@nestjs/common';
import { BaseRepo } from './base.repo';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProgramPlanRepo extends BaseRepo<
  Prisma.ProgramPlanDelegate<DefaultArgs>,
  Prisma.ProgramPlanDelegate
> {
  constructor(prisma: PrismaService) {
    super('ProgramPlan');
    this.prisma = prisma;
  }
}
