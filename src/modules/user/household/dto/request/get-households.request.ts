import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

@InputType()
export class GetHouseholdsData {
  @IsString()
  @IsNotEmpty()
  @Field()
  churchId: string;

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
