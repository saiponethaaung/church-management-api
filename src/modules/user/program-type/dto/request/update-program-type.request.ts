import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateProgramTypeData } from './create-program-type.request';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UpdateProgramTypeData extends PartialType(CreateProgramTypeData) {
  @IsString()
  @IsNotEmpty()
  @Field()
  id: string;
}
