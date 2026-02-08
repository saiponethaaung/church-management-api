import { Injectable } from '@nestjs/common';
import { BaseRepo } from './base.repo';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { PrismaService } from '../prisma.service';

@Injectable()
export class DonationRepo extends BaseRepo<
  Prisma.DonationDelegate<DefaultArgs>,
  Prisma.DonationDelegate
> {
  constructor(prisma: PrismaService) {
    super('Donation');
    this.prisma = prisma;
  }
}
