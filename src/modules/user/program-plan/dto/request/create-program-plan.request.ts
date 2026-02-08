import { Field, InputType } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateProgramPlanAttachmentRequest {
  @Field()
  @IsString()
  @IsNotEmpty()
  url: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  name?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  type?: string;
}

@InputType()
export class CreateProgramPlanRequest {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  programId: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  title?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @Field({ nullable: true })
  @IsDate()
  @IsOptional()
  date?: Date;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  content?: string;

  @Field(() => [CreateProgramPlanAttachmentRequest], { nullable: true })
  @IsOptional()
  attachments?: CreateProgramPlanAttachmentRequest[];
}
