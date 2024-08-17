import { Column, CreatedAt, DataType, DeletedAt, HasOne, Model, Table, UpdatedAt } from "sequelize-typescript";
import { UserLinkEntity } from "./user-link.entity";
import { AccessLinkEntity } from "./../../access-link/entities/acess-link.entity";

@Table({
    tableName: 'links',
    timestamps: true
})
export class UrlEntity extends Model<UrlEntity> {
  @Column
  link: string;

  @Column
  hash: string;

  @CreatedAt
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  createdAt!: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  updatedAt!: Date;

  @DeletedAt
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  deletedAt?: Date;

  @HasOne(() => UserLinkEntity)
  userLink: UserLinkEntity;

  @HasOne(() => AccessLinkEntity)
  access: AccessLinkEntity;
}
