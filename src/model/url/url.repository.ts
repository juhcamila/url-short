import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UrlEntity } from "./entities/url.entity";
import { CreateUrlDto } from "./dto/create-url.dto";

@Injectable()
export class UrlRepository {
    constructor(
        @InjectModel(UrlEntity)
        private readonly urlEntity: typeof UrlEntity
    ) {}

    async create(link: string, hash: string): Promise<UrlEntity> {
        return await UrlEntity.create(<UrlEntity>{
            link,
            hash
        })
    }

    async find(hash: string): Promise<UrlEntity> {
        return await this.urlEntity.findOne({
            where: {
                hash,
                deletedAt: null
            }
        })
    }
}