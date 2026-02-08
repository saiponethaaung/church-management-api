import { Module } from '@nestjs/common';
import { ProgramTypeService } from './program-type.service';
import { ProgramTypeResolver } from './program-type.resolver';

@Module({
  providers: [ProgramTypeService, ProgramTypeResolver],
  exports: [ProgramTypeService],
})
export class ProgramTypeModule {}
