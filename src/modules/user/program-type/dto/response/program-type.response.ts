import { Field, ObjectType } from '@nestjs/graphql';
import { ProgramType } from '@prisma/client';

@ObjectType()
export class ProgramTypeResponse {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  status: boolean;

  @Field()
  isGlobal: boolean;

  @Field({ nullable: true })
  churchId?: string;

  constructor(model: ProgramType) {
    this.id = model.id;
    this.name = model.name;
    this.description = model.description;
    this.status = model.status;
    this.isGlobal = model.isGlobal;
    this.churchId = model.churchId || undefined;
  }
}
