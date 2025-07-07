import { Injectable } from '@nestjs/common';
import { ServiceResponse } from 'src/interfaces/response.interface';
import { UserRegisterDTO } from './dto/request/register.dto';
import { PrismaService } from 'src/libs/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserLoginDTO } from './dto/request/login.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UserRepo } from 'src/libs/prisma/repo/user.repo';

@Injectable()
export class UserAuthService {
  constructor(
    private readonly repo: UserRepo,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: UserRegisterDTO): Promise<ServiceResponse<any>> {
    // check email already exists
    const emailCheck = await this.repo.findOne({
      where: { email: dto.email },
    });

    // if email already exists, return error
    if (emailCheck) {
      return {
        status: false,
        error: {
          errorCode: 'email_already_exists',
          message: 'Email already exists',
        },
      };
    }

    // if email does not exist, create user
    const user = await this.repo.create({
      data: {
        email: dto.email,
        password: bcrypt.hashSync(dto.password, 10),
        name: dto.name,
        verified: false,
      },
    });

    // todo implement email service
    // generate verification code
    // send verification email

    // return success response
    return { status: true, result: user };
  }

  async login(dto: UserLoginDTO): Promise<ServiceResponse<any>> {
    // check email exists
    const user = await this.repo.findOne({
      where: { email: dto.email },
    });

    if (!user) {
      return {
        status: false,
        error: {
          errorCode: 'invalid_credentials',
          message: 'Invalid credentials',
        },
      };
    }

    // check password
    const passwordCheck = bcrypt.compareSync(dto.password, user.password);
    if (!passwordCheck) {
      return {
        status: false,
        error: {
          errorCode: 'invalid_credentials',
          message: 'Invalid credentials',
        },
      };
    }

    // check user verified
    if (!user.verified) {
      return {
        status: false,
        error: {
          errorCode: 'user_not_verified',
          message: 'User not verified',
        },
      };
    }

    return {
      status: true,
      result: {
        accessToken: await this.generateToken(user),
      },
    };
  }

  async generateToken(user: User) {
    return this.jwtService.sign({ email: user.email, id: user.id });
  }

  async profile(user: { id: string; email: string }) {
    return this.repo.findOne({
      where: { id: user.id, email: user.email },
    });
  }
}
