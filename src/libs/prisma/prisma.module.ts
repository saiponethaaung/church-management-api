import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ChurchRepo } from './repo/church.repo';
import { UserRepo } from './repo/user.repo';
import { ChurchMemberRepo } from './repo/church-member.repo';

@Global()
@Module({
  providers: [PrismaService, ChurchRepo, UserRepo, ChurchMemberRepo],
  exports: [PrismaService, ChurchRepo, UserRepo, ChurchMemberRepo],
})
export class PrismaModule {}
