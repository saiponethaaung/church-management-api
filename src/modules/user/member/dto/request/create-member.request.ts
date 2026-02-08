import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
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
  @Transform((params) => {
    return params.value === '' ? undefined : params.value;
  })
  image?: string;

  @Field({ nullable: true })
  @IsString({ message: 'invalid_string' })
  @IsEmail({}, { message: 'invalid_email' })
  @IsOptional({})
  @Transform((params) => {
    return params.value === '' ? undefined : params.value;
  })
  email?: string;

  @Field({ nullable: true })
  @IsString({ message: 'invalid_string' })
  @IsOptional({})
  // TODO add custom regex to validate
  phone?: string;

  @Field({ nullable: true })
  @IsString({ message: 'invalid_string' })
  @IsDateString({}, { message: 'invalid_date' })
  @IsOptional({})
  dob?: string;
  @Field({ nullable: true })
  @IsString({ message: 'invalid_string' })
  @IsUUID(7, { message: 'invalid_id' })
  @IsOptional({})
  householdId?: string;
}
