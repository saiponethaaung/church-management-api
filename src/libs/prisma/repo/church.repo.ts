import { Injectable } from '@nestjs/common';
import { BaseRepo } from './base.repo';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ChurchRepo extends BaseRepo<
  Prisma.ChurchDelegate<DefaultArgs>,
  Prisma.ChurchDelegate
> {
  constructor(prisma: PrismaService) {
    super('Church');
    this.prisma = prisma;
  }
}
