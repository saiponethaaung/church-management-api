import { Field, ObjectType } from '@nestjs/graphql';
import { ProgramPlanAttachment } from '@prisma/client';

@ObjectType()
export class ProgramPlanAttachmentResponse {
  @Field()
  id: string;

  @Field()
  url: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  type?: string;

  @Field()
  createdAt: Date;

  constructor(model: ProgramPlanAttachment) {
    this.id = model.id;
    this.url = model.url;
    this.name = model.name;
    this.type = model.type;
    this.createdAt = model.createdAt;
  }
}
