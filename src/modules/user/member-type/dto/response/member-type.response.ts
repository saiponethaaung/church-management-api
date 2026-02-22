import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MemberTypeResponse {
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

  @Field({ nullable: true })
  churchId?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  constructor(partial: Partial<MemberTypeResponse>) {
    Object.assign(this, partial);
  }
}
