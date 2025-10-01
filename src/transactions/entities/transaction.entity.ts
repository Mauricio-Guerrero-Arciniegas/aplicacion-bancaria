import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

@Table({
  tableName: 'transactions',
  timestamps: true, // ✅ Sequelize creará createdAt y updatedAt
})
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

  @Column({ type: DataType.STRING, allowNull: true })
  description?: string;

  // Relaciones para traer datos de usuarios en el historial
  @BelongsTo(() => User, 'sender_id')
  sender?: User;

  @BelongsTo(() => User, 'receiver_id')
  receiver?: User;
}