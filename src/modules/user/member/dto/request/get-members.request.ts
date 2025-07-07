import { Field, InputType } from '@nestjs/graphql';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
} from 'class-validator';

@InputType({ description: 'createMember' })
export class GetMembersData {
  @Field()
  @IsNumber({}, { message: 'invalid_number' })
  @IsNotEmpty({ message: 'required' })
  page: number;

  @Field()
  @IsNumber({}, { message: 'invalid_number' })
  @IsNotEmpty({ message: 'required' })
  limit: number;

  @Field()
  @IsString({ message: 'invalid_string' })
  @IsUUID(7, { message: 'invalid_id' })
  @IsNotEmpty({ message: 'required' })
  churchId: string;
}
