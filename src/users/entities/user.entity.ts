import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class User extends Model<User> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.STRING(36),
    allowNull: false,
  })
  account_number!: string; 

  @Column({
    type: DataType.FLOAT,
    defaultValue: 0,
  })
  balance!: number;

  // 👇 Sobrescribir toJSON para ocultar el password
  toJSON() {
    const values: any = { ...this.get() };
    delete values.password;
    return values;
  }
}