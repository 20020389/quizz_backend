import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

import { FirebaseAdmin } from 'nestjs-firebase';
export class AuthorizeGuard implements CanActivate {
  constructor(private fireAdmin: FirebaseAdmin) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<NestRequest>();
    const token = request.headers.authorization;

    const auth = this.fireAdmin.auth;
    try {
      request.user = await auth.verifyIdToken(token);
      return true;
    } catch (error: unknown) {
      throw new UnauthorizedException({
        message: (error as Error).message,
      });
    }
  }
}
