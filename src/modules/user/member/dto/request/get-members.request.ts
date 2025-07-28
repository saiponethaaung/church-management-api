import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

@InputType({ description: 'createMember' })
export class GetMembersData {
  @Field(() => Int)
  @IsNumber({}, { message: 'invalid_number' })
  @IsNotEmpty({ message: 'required' })
  page: number;

  @Field(() => Int)
  @IsNumber({}, { message: 'invalid_number' })
  @IsNotEmpty({ message: 'required' })
  limit: number;

  @Field()
  @IsString({ message: 'invalid_string' })
  @IsUUID(7, { message: 'invalid_id' })
  @IsNotEmpty({ message: 'required' })
  churchId: string;
}
