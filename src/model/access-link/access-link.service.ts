import { Inject, Injectable } from "@nestjs/common";
import { AccessLinkRepository } from "./access-link.repository";
import { UrlService } from "../url/url.service";
import { AccessLinkEntity } from "./entities/acess-link.entity";

@Injectable()
export class AccessLinkService {
    constructor(
        @Inject(AccessLinkRepository)
        private readonly accessLinkRepository: AccessLinkRepository,
        @Inject(UrlService)
        private readonly urlService: UrlService
    ) {}

    async increment(hash: string): Promise<AccessLinkEntity> {
        const url = await this.urlService.find(hash)
        if (url) {
            return await this.accessLinkRepository.createOrUpdate(url.id)
        }
    }
}