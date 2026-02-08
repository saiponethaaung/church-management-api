import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateProgramRequest } from './create-program.request';
import { IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class UpdateProgramRequest extends PartialType(CreateProgramRequest) {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
