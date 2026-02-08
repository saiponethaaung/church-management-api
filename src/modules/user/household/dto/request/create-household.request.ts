import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateHouseholdData {
  @IsString()
  @IsNotEmpty()
  @Field()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  churchId: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  address?: string;

  @IsString({ each: true })
  @IsOptional()
  @Field(() => [String], { nullable: true })
  memberIds?: string[];
}
