import { Injectable } from '@nestjs/common';
import { BaseRepo } from './base.repo';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProgramTypeRepo extends BaseRepo<
  Prisma.ProgramTypeDelegate<DefaultArgs>,
  Prisma.ProgramTypeDelegate
> {
  constructor(prisma: PrismaService) {
    super('ProgramType');
    this.prisma = prisma;
  }
}
