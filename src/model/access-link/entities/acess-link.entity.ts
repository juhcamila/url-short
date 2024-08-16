import { Column, CreatedAt, DataType, Model, Table, UpdatedAt } from "sequelize-typescript";

@Table({
    tableName: 'access_links',
    timestamps: false
})
export class AccessLinkEntity extends Model<AccessLinkEntity> {
  @Column
  count: number;
}
