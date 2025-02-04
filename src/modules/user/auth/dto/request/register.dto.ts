import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

@InputType()
export class UserRegisterDTO {
  @Field()
  @ApiProperty()
  @IsNotEmpty({ message: 'required' })
  name: string;

  @Field()
  @ApiProperty()
  @IsNotEmpty({ message: 'required' })
  @IsEmail({}, { message: 'invalid' })
  email: string;

  @Field()
  @ApiProperty()
  @IsNotEmpty({ message: 'required' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'invalid_format',
  })
  @MinLength(8, { message: 'min_length' })
  password: string;
}
