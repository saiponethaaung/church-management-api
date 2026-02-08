import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateAnnouncementRequest {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  message?: string; // This will receive stringified JSON for rich text

  @Field()
  @IsUUID()
  @IsNotEmpty()
  programId: string;

  @Field()
  @IsUUID()
  @IsNotEmpty()
  churchId: string;
}
