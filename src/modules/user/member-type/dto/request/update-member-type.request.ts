import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateMemberTypeData } from './create-member-type.request';
import { IsString } from 'class-validator';

@InputType()
export class UpdateMemberTypeData extends PartialType(CreateMemberTypeData) {
  @Field()
  @IsString()
  id: string;
}
