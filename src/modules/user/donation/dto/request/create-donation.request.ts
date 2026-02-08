import { Field, Float, InputType } from '@nestjs/graphql';
import { PaymentMethod } from '@prisma/client';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

@InputType()
export class CreateDonationData {
  @IsNumber()
  @Min(0)
  @Field(() => Float)
  amount: number;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  donationDate?: string;

  @IsEnum(PaymentMethod)
  @IsOptional()
  @Field(() => PaymentMethod, { defaultValue: PaymentMethod.CASH })
  paymentMethod?: PaymentMethod = PaymentMethod.CASH;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  checkNumber?: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  notes?: string;

  @IsBoolean()
  @IsOptional()
  @Field({ defaultValue: false })
  isAnonymous?: boolean = false;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  churchMemberId?: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  householdId?: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  donationTypeId: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  churchId: string;
}
