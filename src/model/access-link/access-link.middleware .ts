import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request } from "express";
import { AccessLinkService } from "./access-link.service";

@Injectable()
export class AccessLinkMiddleware implements NestMiddleware {
  constructor(private readonly accessLinkService: AccessLinkService) {}

  async use(req: Request, _res: Response, next: NextFunction) {
    const hashUrl = req.params?.hash
    await this.accessLinkService.increment(hashUrl);
    next();
  }
}