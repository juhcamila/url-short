import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UrlEntity } from "./entities/url.entity";
import { UserLinkEntity } from "./entities/user-link.entity";
import { AccessLinkEntity } from "../access-link/entities/acess-link.entity";

@Injectable()
export class UrlRepository {
    constructor(
        @InjectModel(UrlEntity)
        private readonly urlEntity: typeof UrlEntity
    ) {}

    async create(link: string, hash: string, userId?: number): Promise<UrlEntity> {
        return await UrlEntity.create(<UrlEntity>{
            link,
            hash,
            userLink: userId && {
                user_id: userId
            }
        }, {
            include: userId ? [UserLinkEntity] : []
        })
    }

    async find(hash: string): Promise<UrlEntity> {
        return await this.urlEntity.findOne({
            where: {
                hash,
            }
        })
    }

    async findByUser(id: number, userId: number): Promise<UrlEntity> {
        return await this.urlEntity.findOne({
            include: [
                {
                    model: UserLinkEntity,
                    as: 'userLink',
                    where: {
                        user_id: userId
                    }
                }
            ],
            where: {
                id,
            }
        })
    }

    async update(url: UrlEntity, link: string): Promise<UrlEntity> {
        return await url.update({
            link
        })
    }

    async findAllByUser(userId: number): Promise<UrlEntity[]> {
        return await this.urlEntity.findAll({
            attributes: ['id', 'link', 'hash', 'createdAt', 'updatedAt'],
            include: [
                {
                    model: UserLinkEntity,
                    as: 'userLink',
                    where: {
                        user_id: userId
                    }
                }, {
                    model: AccessLinkEntity,
                    as: 'access'
                }
            ]
        })
    }

    
    async delete(url: UrlEntity): Promise<void> {
        return await url.destroy()
    }
}