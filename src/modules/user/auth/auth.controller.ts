import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserRegisterDTO } from './dto/request/register.dto';
import { UserAuthService } from './auth.service';
import { HandledExceptionFilter } from 'src/filters/handled-exception/handled-exception.filter';
import { UserLoginDTO } from './dto/request/login.dto';
import { UserJwtAuthGuard } from 'src/libs/passport/user/user-jwt.guard';
import { AuthUserRequest } from 'src/interfaces/request.interface';

@Controller('user/auth')
export class UserAuthController {
  constructor(private readonly service: UserAuthService) {}

  @Post('/register')
  async register(@Body() dto: UserRegisterDTO) {
    const serviceResponse = await this.service.register(dto);

    if (!serviceResponse.status) {
      throw new HandledExceptionFilter(
        serviceResponse.error,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return serviceResponse.result;
  }

  @Post('/login')
  async login(@Body() dto: UserLoginDTO) {
    const serviceResponse = await this.service.login(dto);

    if (!serviceResponse.status) {
      throw new HandledExceptionFilter(
        serviceResponse.error,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return serviceResponse.result;
  }

  @UseGuards(UserJwtAuthGuard)
  @Get('/profile')
  async profile(@Req() req: AuthUserRequest) {
    return req.user;
  }
}
