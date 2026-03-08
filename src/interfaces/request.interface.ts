import { FastifyRequest } from 'fastify';

export interface AuthUserObject {
  id: string;
  name: string;
  email: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}

export interface AuthUserRequest extends Partial<FastifyRequest> {
  user: AuthUserObject;
}
