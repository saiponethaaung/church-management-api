import { Injectable } from '@nestjs/common';
import { BaseRepo } from './base.repo';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AnnouncementRepo extends BaseRepo<
  Prisma.AnnouncementDelegate<DefaultArgs>,
  Prisma.AnnouncementDelegate
> {
  constructor(prisma: PrismaService) {
    super('Announcement');
    this.prisma = prisma;
  }
}
