import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateMemberTypeData {
  @Field()
  @IsString()
  name: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @Field({ nullable: true, defaultValue: true })
  @IsBoolean()
  @IsOptional()
  status?: boolean;

  @Field({ nullable: true, defaultValue: false })
  @IsBoolean()
  @IsOptional()
  isGlobal?: boolean;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  churchId?: string;
}
