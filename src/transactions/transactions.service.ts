import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from './models/transaction.model';
import { User } from '../users/models/user.model';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction) private txModel: typeof Transaction,
    @InjectModel(User) private userModel: typeof User,
    private sequelize: Sequelize,
  ) {}

  async create(senderId: string, dto: { receiver_id: string; amount: string; description?: string }) {
    const amount = parseFloat(dto.amount);
    if (isNaN(amount) || amount <= 0) throw new BadRequestException('Invalid amount');

    return await this.sequelize.transaction(async (t) => {
      // Bloquear filas para update
      const sender = await this.userModel.findByPk(senderId, { transaction: t, lock: t.LOCK.UPDATE });
      if (!sender) throw new NotFoundException('Sender not found');

      const receiver = await this.userModel.findByPk(dto.receiver_id, { transaction: t, lock: t.LOCK.UPDATE });
      if (!receiver) throw new NotFoundException('Receiver not found');

      const senderBalance = Number(sender.balance);
      const receiverBalance = Number(receiver.balance);

      if (senderBalance < amount) throw new BadRequestException('Insufficient funds');

      // Actualizar balances como números
      sender.balance = senderBalance - amount;
      receiver.balance = receiverBalance + amount;

      await sender.save({ transaction: t });
      await receiver.save({ transaction: t });

      const tx = await this.txModel.create({
        sender_id: sender.id,
        receiver_id: receiver.id,
        amount,
        description: dto.description || null,
      } as any, { transaction: t });

      return tx;
    });
  }

  async findAllForUser(userId: string) {
    return this.txModel.findAll({
      where: {
        [(this.txModel.sequelize as any).Op.or]: [
          { sender_id: userId },
          { receiver_id: userId },
        ],
      },
      order: [['transaction_date', 'DESC']],
    });
  }

  async findById(id: string) {
    return this.txModel.findByPk(id);
  }
}