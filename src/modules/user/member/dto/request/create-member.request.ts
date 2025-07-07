import { Field, InputType } from '@nestjs/graphql';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
} from 'class-validator';

@InputType({ description: 'createMember' })
export class CreateMemberData {
  @Field()
  @IsString({ message: 'invalid_string' })
  @IsUUID(7, { message: 'invalid_id' })
  @IsNotEmpty({ message: 'required' })
  churchId: string;

  @Field()
  @IsString({ message: 'invalid_string' })
  @IsNotEmpty({ message: 'required' })
  name: string;

  @Field({ nullable: true })
  @IsString({ message: 'invalid_string' })
  @IsOptional({})
  image?: string;

  @Field({ nullable: true })
  @IsString({ message: 'invalid_string' })
  @IsEmail({}, { message: 'invalid_email' })
  @IsOptional({})
  email?: string;

  @Field({ nullable: true })
  @IsString({ message: 'invalid_string' })
  @IsPhoneNumber(undefined, { message: 'invalid_phone' })
  @IsOptional({})
  phone?: string;

  @Field({ nullable: true })
  @IsString({ message: 'invalid_string' })
  @IsDate({ message: 'invalid_date' })
  @IsOptional({})
  dob?: string;
}
