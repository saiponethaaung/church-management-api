import { Field, Float, InputType } from '@nestjs/graphql';
import { PaymentMethod } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

@InputType()
export class UpdateDonationData {
  @IsString()
  @IsNotEmpty()
  @Field()
  id: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  @Field(() => Float, { nullable: true })
  amount?: number;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  donationDate?: string;

  @IsEnum(PaymentMethod)
  @IsOptional()
  @Field(() => PaymentMethod, { nullable: true })
  paymentMethod?: PaymentMethod;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  checkNumber?: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  notes?: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  donationTypeId?: string;
}
