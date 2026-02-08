import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Donation, PaymentMethod } from '@prisma/client';

@ObjectType()
export class DonationMemberResponse {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  email?: string;
}

@ObjectType()
export class DonationHouseholdResponse {
  @Field()
  id: string;

  @Field()
  name: string;
}

@ObjectType()
export class DonationTypeInfoResponse {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  isTaxDeductible: boolean;
}

@ObjectType()
export class DonationResponse {
  @Field()
  id: string;

  @Field(() => Float)
  amount: number;

  @Field()
  donationDate: string;

  @Field(() => PaymentMethod)
  paymentMethod: PaymentMethod;

  @Field({ nullable: true })
  checkNumber?: string;

  @Field({ nullable: true })
  notes?: string;

  @Field()
  isAnonymous: boolean;

  @Field(() => DonationMemberResponse, { nullable: true })
  member?: DonationMemberResponse;

  @Field(() => DonationHouseholdResponse, { nullable: true })
  household?: DonationHouseholdResponse;

  @Field(() => DonationTypeInfoResponse)
  donationType: DonationTypeInfoResponse;

  @Field()
  createdAt: string;

  constructor(model: Donation & { member?: any; household?: any; donationType?: any }) {
    this.id = model.id;
    this.amount = model.amount;
    this.donationDate = model.donationDate.toISOString();
    this.paymentMethod = model.paymentMethod;
    this.checkNumber = model.checkNumber || undefined;
    this.notes = model.notes || undefined;
    this.isAnonymous = model.isAnonymous;
    this.createdAt = model.createdAt.toISOString();

    if (model.member) {
      this.member = {
        id: model.member.id,
        name: model.member.name,
        email: model.member.email || undefined,
      };
    }

    if (model.household) {
      this.household = {
        id: model.household.id,
        name: model.household.name,
      };
    }

    if (model.donationType) {
      this.donationType = {
        id: model.donationType.id,
        name: model.donationType.name,
        isTaxDeductible: model.donationType.isTaxDeductible,
      };
    }
  }
}
