import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

@InputType({ description: 'deleteMember' })
export class DeleteMemberData {
  @Field()
  @IsString({ message: 'invalid_string' })
  @IsUUID(7, { message: 'invalid_id' })
  @IsNotEmpty({ message: 'required' })
  id: string;
}
