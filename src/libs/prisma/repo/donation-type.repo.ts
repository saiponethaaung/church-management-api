import { Injectable } from '@nestjs/common';
import { BaseRepo } from './base.repo';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { PrismaService } from '../prisma.service';

@Injectable()
export class DonationTypeRepo extends BaseRepo<
  Prisma.DonationTypeDelegate<DefaultArgs>,
  Prisma.DonationTypeDelegate
> {
  constructor(prisma: PrismaService) {
    super('DonationType');
    this.prisma = prisma;
  }
}
