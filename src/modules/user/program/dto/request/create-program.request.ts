import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ProgramMode } from '@prisma/client';

@InputType()
export class CreateProgramRequest {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @Field({ nullable: true })
  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean;

  @Field({ nullable: true })
  @IsBoolean()
  @IsOptional()
  status?: boolean;

  @Field(() => ProgramMode, { defaultValue: ProgramMode.IN_PERSON })
  @IsEnum(ProgramMode)
  mode: ProgramMode;

  @Field({ nullable: true })
  @IsBoolean()
  @IsOptional()
  isRecurring?: boolean;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  recurrence?: string;

  @Field({ nullable: true })
  @IsOptional()
  startDate?: Date;

  @Field({ nullable: true })
  @IsOptional()
  endDate?: Date;

  @Field()
  @IsUUID()
  @IsNotEmpty()
  programTypeId: string;

  @Field({ nullable: true })
  @IsUUID()
  @IsOptional()
  leaderId?: string;

  @Field()
  @IsUUID()
  @IsNotEmpty()
  churchId: string;
}
