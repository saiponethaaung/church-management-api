import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateDonationTypeData {
  @IsString()
  @IsNotEmpty()
  @Field()
  id: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  name?: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  description?: string;

  @IsBoolean()
  @IsOptional()
  @Field({ nullable: true })
  status?: boolean;

  @IsBoolean()
  @IsOptional()
  @Field({ nullable: true })
  isTaxDeductible?: boolean;
}
