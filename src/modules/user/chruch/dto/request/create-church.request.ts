import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType({ description: 'createChurch' })
export class CreateChurchData {
  @Field()
  @IsNotEmpty({ message: 'required' })
  name: string;
}
