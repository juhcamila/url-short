import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { UserEntity } from "./../../auth/entities/auth.entity";
import { UrlEntity } from "./../../url/entities/url.entity";

@Table({
    tableName: 'users_links',
    timestamps: false,
})
export class UserLinkEntity extends Model<UserLinkEntity> {
  @ForeignKey(() => UrlEntity)
  @PrimaryKey
  @Column
  link_id: number;

  @BelongsTo(() => UrlEntity)
  link: UrlEntity;

  @ForeignKey(() => UserEntity)
  @PrimaryKey
  @Column
  user_id: number;

  @BelongsTo(() => UserEntity)
  user: UserEntity;
}
