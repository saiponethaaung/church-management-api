import { Field, ObjectType } from '@nestjs/graphql';
import { DonationType } from '@prisma/client';

@ObjectType()
export class DonationTypeResponse {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  status: boolean;

  @Field()
  isGlobal: boolean;

  @Field()
  isTaxDeductible: boolean;

  @Field({ nullable: true })
  churchId?: string;

  constructor(model: DonationType) {
    this.id = model.id;
    this.name = model.name;
    this.description = model.description || undefined;
    this.status = model.status;
    this.isGlobal = model.isGlobal;
    this.isTaxDeductible = model.isTaxDeductible;
    this.churchId = model.churchId || undefined;
  }
}
