import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class GetMemberTypesData {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  churchId?: string;

  @Field(() => Int, { defaultValue: 1, nullable: true })
  @IsNumber()
  @IsOptional()
  page?: number;

  @Field(() => Int, { defaultValue: 10, nullable: true })
  @IsNumber()
  @IsOptional()
  limit?: number;
}
