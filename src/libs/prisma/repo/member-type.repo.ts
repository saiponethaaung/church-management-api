import { Injectable } from '@nestjs/common';
import { BaseRepo } from './base.repo';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { PrismaService } from '../prisma.service';

@Injectable()
export class MemberTypeRepo extends BaseRepo<
  Prisma.MemberTypeDelegate<DefaultArgs>,
  Prisma.MemberTypeDelegate
> {
  constructor(prisma: PrismaService) {
    super('MemberType');
    this.prisma = prisma;
  }
}
