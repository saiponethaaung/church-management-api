import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class ReorderProgramPlanSectionsRequest {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  programPlanId: string;

  @Field(() => [String])
  @IsArray()
  @IsNotEmpty()
  sectionIds: string[];
}
