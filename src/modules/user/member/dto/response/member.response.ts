import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ChurchMember } from '@prisma/client';
import { JsonValue } from '@prisma/client/runtime/library';

@ObjectType({ description: 'memberAddress' })
export class MemberAddress {
  constructor(address: JsonValue) {
    this.street = address['street'];
  }

  @Field()
  street: string;
}

@ObjectType({ description: 'member' })
export class MemberResponse {
  constructor(member?: ChurchMember) {
    if (member) {
      this.id = member.id;
      this.name = member.name;
      this.image = member.image;
      this.email = member.email;
      this.phone = member.phone;
      this.dob = member.dob;
      this.address = new MemberAddress({
        street:
          member.address && member.address['street']
            ? member.address['street']
            : '',
      });
    }
  }

  @Field({})
  id: String;

  @Field({})
  name: String;

  @Field({ nullable: true })
  image?: String;

  @Field({ nullable: true })
  email?: String;

  @Field({ nullable: true })
  phone?: String;

  @Field({ nullable: true })
  dob?: String;

  @Field(() => MemberAddress)
  address: MemberAddress;
}
