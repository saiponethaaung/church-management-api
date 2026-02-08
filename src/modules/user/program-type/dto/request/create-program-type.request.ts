import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateProgramTypeData {
  @IsString()
  @IsNotEmpty()
  @Field()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  description: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  churchId?: string;

  @IsBoolean()
  @IsOptional()
  @Field({ defaultValue: true })
  status?: boolean = true;
}
