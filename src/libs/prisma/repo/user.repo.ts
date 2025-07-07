import { Injectable } from '@nestjs/common';
import { BaseRepo } from './base.repo';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UserRepo extends BaseRepo<
  Prisma.UserDelegate<DefaultArgs>,
  Prisma.UserDelegate
> {
 constructor(prisma: PrismaService) {
     super('User');
     this.prisma = prisma;
   }
}
