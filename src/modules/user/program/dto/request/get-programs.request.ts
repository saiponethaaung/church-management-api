import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, Min } from 'class-validator';

@InputType()
export class GetProgramsRequest {
  @IsString()
  @IsNotEmpty()
  @Field()
  churchId: string;

  @Field({ nullable: true })
  @IsUUID()
  @IsOptional()
  programTypeId?: string;

  @IsInt()
  @IsOptional()
  @Min(1)
  @Field(() => Int, { defaultValue: 10 })
  limit: number = 10;

  @IsInt()
  @IsOptional()
  @Min(1)
  @Field(() => Int, { defaultValue: 1 })
  page: number = 1;
}
