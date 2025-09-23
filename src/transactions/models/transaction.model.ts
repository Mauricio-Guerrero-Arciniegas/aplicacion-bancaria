import { Table, Column, Model, DataType, PrimaryKey, Default, ForeignKey, CreatedAt } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../../users/models/user.model';

@Table({ tableName: 'transactions', timestamps: false })
export class Transaction extends Model<Transaction> {
  @PrimaryKey
  @Default(() => uuidv4())
  @Column({ type: DataType.UUID })
  id!: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  sender_id!: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  receiver_id!: string;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  amount!: number;

  @CreatedAt
  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  transaction_date!: Date;

  @Column({ type: DataType.TEXT, allowNull: true })
  description?: string;
}
