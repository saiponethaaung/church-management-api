import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'church' })
export class ChurchResponse {
  @Field(() => ID)
  id: string;
}
