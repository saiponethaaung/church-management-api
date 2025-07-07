import { Injectable } from '@nestjs/common';
import { BaseRepo } from './base.repo';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ChurchMemberRepo extends BaseRepo<
  Prisma.ChurchMemberDelegate<DefaultArgs>,
  Prisma.ChurchMemberDelegate
> {
  constructor(prisma: PrismaService) {
    super('ChurchMember');
    this.prisma = prisma;
  }
}
