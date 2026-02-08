import { Injectable } from '@nestjs/common';
import { BaseRepo } from './base.repo';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProgramRepo extends BaseRepo<
  Prisma.ProgramDelegate<DefaultArgs>,
  Prisma.ProgramDelegate
> {
  constructor(prisma: PrismaService) {
    super('Program');
    this.prisma = prisma;
  }
}
