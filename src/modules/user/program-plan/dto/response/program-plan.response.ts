import { Field, ObjectType } from '@nestjs/graphql';
import { ProgramPlan, ProgramPlanAttachment } from '@prisma/client';
import { ProgramPlanAttachmentResponse } from './program-plan-attachment.response';

@ObjectType()
export class ProgramPlanResponse {
  @Field()
  id: string;

  @Field()
  programId: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  date?: Date;

  @Field({ nullable: true })
  content?: string; // Returning as stringified JSON for simplicity, or handle specifically if needed

  @Field(() => [ProgramPlanAttachmentResponse], { nullable: true })
  attachments?: ProgramPlanAttachmentResponse[];

  @Field()
  status: boolean;

  @Field()
  createdBy: string;

  @Field()
  updatedBy: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  constructor(model: ProgramPlan & { attachments?: ProgramPlanAttachment[] }) {
    this.id = model.id;
    this.programId = model.programId;
    this.title = model.title;
    this.description = model.description;
    this.date = model.date;
    this.content = model.content ? JSON.stringify(model.content) : null;
    this.status = model.status;
    this.createdBy = model.createdBy;
    this.updatedBy = model.updatedBy;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;

    if (model.attachments) {
      this.attachments = model.attachments.map(
        (a) => new ProgramPlanAttachmentResponse(a),
      );
    }
  }
}
