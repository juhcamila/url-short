import { Injectable, NestMiddleware, Logger, UnauthorizedException, Inject } from '@nestjs/common';
import { Request, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor() {}

  async use(req: Request, _res: Response, next: NextFunction) {
    if(!req['user']) throw new UnauthorizedException();
    next()
  }
}