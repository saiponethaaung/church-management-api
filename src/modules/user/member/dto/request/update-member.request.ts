import { Field, InputType } from '@nestjs/graphql';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

@InputType({ description: 'updateMember' })
export class UpdateMemberData {
  @Field()
  @IsString({ message: 'invalid_string' })
  @IsUUID(7, { message: 'invalid_id' })
  @IsNotEmpty({ message: 'required' })
  id: string;

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
  @IsOptional({})
  // TODO add custom regex to validate
  phone?: string;

  @Field({ nullable: true })
  @IsString({ message: 'invalid_string' })
  @IsDateString({}, { message: 'invalid_date' })
  @IsOptional({})
  dob?: string;
}
