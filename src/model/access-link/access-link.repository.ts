import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { AccessLinkEntity } from "./entities/acess-link.entity";

@Injectable()
export class AccessLinkRepository {
    constructor(
        @InjectModel(AccessLinkEntity)
        private readonly accessLinkEntity: typeof AccessLinkEntity
    ) {}

    async create(linkId: number): Promise<AccessLinkEntity> {
        return await AccessLinkEntity.create(<AccessLinkEntity>{
            link_id: linkId,
            count: 1
        })
    }

    async createOrUpdate(linkId: number): Promise<AccessLinkEntity> {
        const access = await this.accessLinkEntity.findOne({
            where: { link_id: linkId}
        })
        return access ? await this.update(access) : this.create(linkId)
    }

    async update(accessLinkModel: AccessLinkEntity): Promise<AccessLinkEntity> {
        return await accessLinkModel.update({
            count: accessLinkModel.count + 1
        })
    }
}