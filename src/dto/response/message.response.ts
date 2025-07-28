import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'message' })
export class MessageResponse {
  @Field({})
  message: String;
}
