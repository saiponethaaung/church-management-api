import { Injectable } from '@nestjs/common';
import { BaseRepo } from './base.repo';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { PrismaService } from '../prisma.service';

@Injectable()
export class HouseholdRepo extends BaseRepo<
  Prisma.HouseholdDelegate<DefaultArgs>,
  Prisma.HouseholdDelegate
> {
  constructor(prisma: PrismaService) {
    super('Household');
    this.prisma = prisma;
  }
}
