import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ProgramPlanSection, ProgramPlanSectionProposal, ProgramPlanSectionType } from '@prisma/client';

registerEnumType(ProgramPlanSectionType, { name: 'ProgramPlanSectionType' });

@ObjectType()
export class ProgramPlanSectionProposalResponse {
  @Field()
  id: string;

  @Field()
  sectionId: string;

  @Field()
  proposedBy: string;

  @Field({ nullable: true })
  proposedByName?: string;

  @Field({ nullable: true })
  content?: string;

  @Field()
  accepted: boolean;

  @Field()
  createdAt: Date;

  constructor(model: ProgramPlanSectionProposal & { proposedByUser?: { name: string } }) {
    this.id = model.id;
    this.sectionId = model.sectionId;
    this.proposedBy = model.proposedBy;
    this.proposedByName = (model as any).proposedByUser?.name;
    this.content = model.content ? JSON.stringify(model.content) : null;
    this.accepted = model.accepted;
    this.createdAt = model.createdAt;
  }
}

@ObjectType()
export class ProgramPlanSectionResponse {
  @Field()
  id: string;

  @Field()
  programPlanId: string;

  @Field()
  title: string;

  @Field(() => ProgramPlanSectionType)
  type: ProgramPlanSectionType;

  @Field({ nullable: true })
  content?: string;

  @Field(() => Int, { nullable: true })
  durationMinutes?: number;

  @Field(() => Int)
  sortOrder: number;

  @Field(() => [ProgramPlanSectionProposalResponse], { nullable: true })
  proposals?: ProgramPlanSectionProposalResponse[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  constructor(model: ProgramPlanSection & { proposals?: (ProgramPlanSectionProposal & { proposedByUser?: { name: string } })[] }) {
    this.id = model.id;
    this.programPlanId = model.programPlanId;
    this.title = model.title;
    this.type = model.type;
    this.content = model.content ? JSON.stringify(model.content) : null;
    this.durationMinutes = model.durationMinutes;
    this.sortOrder = model.sortOrder;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;

    if (model.proposals) {
      this.proposals = model.proposals.map(
        (p) => new ProgramPlanSectionProposalResponse(p),
      );
    }
  }
}
