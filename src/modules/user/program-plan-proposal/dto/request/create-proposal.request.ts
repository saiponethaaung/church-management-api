import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateProposalRequest {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  sectionId: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  content: string;
}
