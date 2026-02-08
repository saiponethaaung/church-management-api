import { Field, ObjectType } from '@nestjs/graphql';
import { Household } from '@prisma/client';
import { MemberResponse } from '../../../member/dto/response/member.response';
// Correct path: ../../member/dto/response/member.response

@ObjectType()
export class HouseholdResponse {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  churchId: string;

  @Field({ nullable: true })
  address?: string;

  // We can add members field here for resolution
  @Field(() => [MemberResponse], { nullable: 'itemsAndList' })
  members?: MemberResponse[];

  constructor(model: Partial<Household & { members?: any[] }>) {
    this.id = model.id;
    this.name = model.name;
    this.churchId = model.churchId;
    
    if (model.address && typeof model.address === 'object' && 'address' in model.address) {
       this.address = (model.address as any).address;
    }

    // Map members if present
    if (model.members) {
      this.members = model.members.map(m => new MemberResponse(m));
    }
  }
}
