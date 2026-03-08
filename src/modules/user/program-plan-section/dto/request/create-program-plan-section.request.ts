import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, Min } from 'class-validator';
import { ProgramPlanSectionType } from '@prisma/client';

registerEnumType(ProgramPlanSectionType, { name: 'ProgramPlanSectionType' });

@InputType()
export class CreateProgramPlanSectionRequest {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  programPlanId: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Field(() => ProgramPlanSectionType, { nullable: true })
  @IsEnum(ProgramPlanSectionType)
  @IsOptional()
  type?: ProgramPlanSectionType;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  content?: string;

  @Field({ nullable: true })
  @IsInt()
  @Min(0)
  @IsOptional()
  durationMinutes?: number;

  @Field({ nullable: true })
  @IsInt()
  @Min(0)
  @IsOptional()
  sortOrder?: number;
}
