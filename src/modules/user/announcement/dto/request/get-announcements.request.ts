import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsUUID, Min } from 'class-validator';

@InputType()
export class GetAnnouncementsRequest {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  churchId: string;

  @Field({ nullable: true })
  @IsUUID()
  @IsOptional()
  programId?: string;

  @Field(() => Int, { defaultValue: 1 })
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @Field(() => Int, { defaultValue: 10 })
  @Min(1)
  @IsOptional()
  limit?: number = 10;
}
