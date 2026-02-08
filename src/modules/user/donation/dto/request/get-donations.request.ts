import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

@InputType()
export class GetDonationsData {
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  churchId?: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  memberId?: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  householdId?: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  donationTypeId?: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  startDate?: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  endDate?: string;

  @IsInt()
  @Min(1)
  @Field(() => Int, { defaultValue: 10 })
  limit: number = 10;

  @IsInt()
  @Min(1)
  @Field(() => Int, { defaultValue: 1 })
  page: number = 1;
}
