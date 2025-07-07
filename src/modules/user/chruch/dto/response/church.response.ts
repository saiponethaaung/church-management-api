import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Church } from '@prisma/client';
import { JsonValue } from '@prisma/client/runtime/library';

@ObjectType({ description: 'churchAddress' })
export class ChurchAddress {
  constructor(address: JsonValue) {
    this.street = address['street'];
  }

  @Field()
  street: string;
}

@ObjectType({ description: 'church' })
export class ChurchResponse {
  constructor(church?: Church) {
    if (church) {
      this.id = church.id;
      this.name = church.name;
      this.logo = church.logo ?? '';
      this.verified = church.verified;
      this.address = new ChurchAddress({
        street:
          church.address && church.address['street']
            ? church.address['street']
            : '',
      });
      this.countryId = church.countryId;
    }
  }

  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  logo: string;

  @Field(() => Boolean)
  verified: boolean;

  @Field(() => ChurchAddress)
  address: ChurchAddress;

  @Field(() => String)
  countryId: string;
}
