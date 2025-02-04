import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class UserLoginDTO {
  @Field()
  @ApiProperty()
  @IsNotEmpty({ message: 'required' })
  @IsEmail({}, { message: 'invalid' })
  email: string;

  @Field()
  @ApiProperty()
  @IsNotEmpty({ message: 'required' })
  password: string;
}
