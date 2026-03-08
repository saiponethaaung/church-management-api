import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from '@prisma/client';

export const GQLCurrentUser = createParamDecorator<any, ExecutionContext>(
  (data: unknown, ctx: ExecutionContext) => {
    const gqlContext = GqlExecutionContext.create(ctx).getContext();
    const req = gqlContext.req || gqlContext.request;
    return req.user;
  },
);
