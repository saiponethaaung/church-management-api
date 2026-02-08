import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateProgramPlanRequest } from './create-program-plan.request';
import { IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class UpdateProgramPlanRequest extends PartialType(CreateProgramPlanRequest) {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
