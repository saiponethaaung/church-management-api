import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateDonationTypeData {
  @IsString()
  @IsNotEmpty()
  @Field()
  name: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  description?: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  churchId?: string;

  @IsBoolean()
  @IsOptional()
  @Field({ defaultValue: true })
  status?: boolean = true;

  @IsBoolean()
  @IsOptional()
  @Field({ defaultValue: true })
  isTaxDeductible?: boolean = true;
}
