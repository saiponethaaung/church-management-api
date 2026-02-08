import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Program, ProgramMode, ChurchMember, ProgramPlan } from '@prisma/client';
import { MemberResponse } from '../../../member/dto/response/member.response';
import { ProgramPlanResponse } from '../../../program-plan/dto/response/program-plan.response';

registerEnumType(ProgramMode, {
  name: 'ProgramMode',
});

@ObjectType()
export class ProgramResponse {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  isFeatured: boolean;

  @Field()
  status: boolean;

  @Field(() => ProgramMode)
  mode: ProgramMode;

  @Field()
  isRecurring: boolean;

  @Field({ nullable: true })
  recurrence?: string;

  @Field({ nullable: true })
  startDate?: Date;

  @Field({ nullable: true })
  endDate?: Date;

  @Field()
  programTypeId: string;

  @Field({ nullable: true })
  leaderId?: string;

  @Field(() => MemberResponse, { nullable: true })
  leader?: MemberResponse;

  @Field(() => [ProgramPlanResponse], { nullable: true })
  plans?: ProgramPlanResponse[];

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

  constructor(
    model: Program & { leader?: ChurchMember; plans?: ProgramPlan[] },
  ) {
    this.id = model.id;
    this.name = model.name;
    this.description = model.description;
    this.isFeatured = model.isFeatured;
    this.status = model.status;
    this.mode = model.mode;
    this.isRecurring = model.isRecurring;
    this.recurrence = model.recurrence;
    this.startDate = model.startDate;
    this.endDate = model.endDate;
    this.programTypeId = model.programTypeId;
    this.leaderId = model.leaderId;
    this.churchId = model.churchId;
    this.createdBy = model.createdBy;
    this.updatedBy = model.updatedBy;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;

    if (model.leader) {
      this.leader = new MemberResponse(model.leader);
    }

    if (model.plans) {
      this.plans = model.plans.map((p) => new ProgramPlanResponse(p));
    }
  }
}
