import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateHouseholdData } from './create-household.request';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UpdateHouseholdData extends PartialType(CreateHouseholdData) {
  @IsString()
  @IsNotEmpty()
  @Field()
  @Field()
  id: string;
}
