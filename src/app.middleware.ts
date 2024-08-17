import { Injectable, NestMiddleware, Inject, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, NextFunction } from 'express';
import { extractTokenFromHeader } from './config/utils';

@Injectable()
export class AppMiddleware implements NestMiddleware {
  private readonly logger = new Logger(AppMiddleware.name);

  constructor(
    @Inject(JwtService)
    private readonly jwtService: JwtService
  ) {}

  async use(req: Request, _res: Response, next: NextFunction) {
    const method = req.method;
    const path = req.path;
    const token = extractTokenFromHeader(req);
    let user
    try {
      if (token) {
        user = await this.jwtService.verifyAsync(token, {
          secret: process.env.HASH_SECRET_TOKEN,
        });
        req['user'] = user
      }
    } catch (error) {
      console.log(error)
    }

    this.logger.log(`[${new Date().toISOString()}] ${method} ${path} - User ID: ${user?.id}`);

    next()
  }
}