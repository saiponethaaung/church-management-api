import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType('AccessToken')
export class AccessTokenResponse {
  @Field()
  @ApiProperty()
  accessToken: string;
}
