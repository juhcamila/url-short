import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { UrlEntity } from "src/model/url/entities/url.entity";

@Table({
    tableName: 'access_links',
    timestamps: false
})
export class AccessLinkEntity extends Model<AccessLinkEntity> {
  @Column
  count: number;

  @ForeignKey(() => UrlEntity)
  @Column
  link_id: number;

  @BelongsTo(() => UrlEntity)
  link: UrlEntity;
}
