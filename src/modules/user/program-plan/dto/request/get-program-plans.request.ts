import { Field, InputType } from '@nestjs/graphql';
import { IsInt, IsOptional, IsUUID, Min } from 'class-validator';

@InputType()
export class GetProgramPlansRequest {
  @Field()
  @IsUUID()
  programId: string;

  @Field({ defaultValue: 1 })
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number;

  @Field({ defaultValue: 10 })
  @IsInt()
  @Min(1)
  @IsOptional()
  limit?: number;
  
  @Field({ nullable: true })
  @IsOptional()
  isPast?: boolean;
}
