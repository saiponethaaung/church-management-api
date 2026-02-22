import { Module } from '@nestjs/common';
import { MemberTypeService } from './member-type.service';
import { MemberTypeResolver } from './member-type.resolver';
import { MemberTypeRepo } from 'src/libs/prisma/repo/member-type.repo';

@Module({
  providers: [MemberTypeRepo, MemberTypeService, MemberTypeResolver],
})
export class MemberTypeModule {}
