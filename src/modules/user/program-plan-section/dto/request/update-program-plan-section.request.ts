import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateProgramPlanSectionRequest } from './create-program-plan-section.request';
import { IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class UpdateProgramPlanSectionRequest extends PartialType(CreateProgramPlanSectionRequest) {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
