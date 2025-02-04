import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

@ObjectType({ description: 'user' })
export class UserResponse {
  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.verified = user.verified;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.createdBy = user.createdBy;
    this.updatedBy = user.updatedBy;
  }

  @Field(() => ID)
  @ApiProperty()
  id: string;

  @Field()
  @ApiProperty()
  name: string;

  @Field()
  @ApiProperty()
  email: string;

  @Field()
  @ApiProperty()
  verified: boolean;

  @Field()
  @ApiProperty()
  createdAt: Date;

  @Field()
  @ApiProperty()
  updatedAt: Date;

  @Field({ nullable: true })
  @ApiProperty({ required: false })
  createdBy: string;

  @Field({ nullable: true })
  @ApiProperty({ required: false })
  updatedBy: string;
}
