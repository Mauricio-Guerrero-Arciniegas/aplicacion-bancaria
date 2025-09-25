import { Table, Column, Model, DataType, PrimaryKey, Default, Unique, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';

@Table({ tableName: 'users', timestamps: true })
export class User extends Model<User> {
  @PrimaryKey
  @Default(() => uuidv4())
  @Column({ type: DataType.UUID })
  id!: string;

  @Column({ type: DataType.STRING(100), allowNull: false })
  name!: string;

  @Unique
  @Column({ type: DataType.STRING(100), allowNull: false })
  email!: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  password!: string;

  @Unique
  @Column({ type: DataType.STRING(10), allowNull: false })
  account_number!: string;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false, defaultValue: 0.00 })
  balance!: number;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;
}
