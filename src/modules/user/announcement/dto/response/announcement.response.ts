import { Field, ObjectType } from '@nestjs/graphql';
import { Announcement } from '@prisma/client';

@ObjectType()
export class AnnouncementResponse {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  message?: string;

  @Field()
  programId: string;

  @Field()
  churchId: string;

  @Field()
  createdBy: string;

  @Field()
  updatedBy: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  constructor(model: Announcement) {
    this.id = model.id;
    this.name = model.name;
    this.message = model.message ? JSON.stringify(model.message) : undefined;
    this.programId = model.programId;
    this.churchId = model.churchId;
    this.createdBy = model.createdBy;
    this.updatedBy = model.updatedBy;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
  }
}
