import { BadRequestException, Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { TransferDto } from './dto/transfer.dto';
import { UniqueConstraintError, ValidationError, CreationAttributes, Op } from 'sequelize';
import { Transaction } from '../transactions/entities/transaction.entity'; // 👈 IMPORTANTE

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    @InjectModel(Transaction)
    private readonly transactionModel: typeof Transaction,
  ) {}

  // Crear usuario
  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      const accountNumber =
        'AC-' + Math.floor(1000000000 + Math.random() * 9000000000).toString();

      const user = await this.userModel.create({
        name: createUserDto.name,
        email: createUserDto.email,
        password: hashedPassword,
        account_number: accountNumber,
        balance: createUserDto.balance ?? 0,
      } as any);

      const { password, ...result } = user.toJSON();
      result.balance = Number(result.balance).toFixed(2);
      return result;
    } catch (error) {
      console.log('Error al crear usuario:', error);
      if (error instanceof UniqueConstraintError) {
        throw new BadRequestException('El correo ya está registrado');
      }
      if (error instanceof ValidationError) {
        throw new BadRequestException(
          error.errors.map(e => e.message).join(', '),
        );
      }
      throw new InternalServerErrorException('Error al crear el usuario');
    }
  }

  // Obtener todos los usuarios
  async findAll(): Promise<Omit<User, 'password'>[]> {
    const users = await this.userModel.findAll();
    return users.map(u => {
      const { password, ...result } = u.toJSON();
      result.balance = Number(result.balance).toFixed(2);
      return result;
    });
  }

  // Buscar usuario por email
  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ where: { email } });
  }

  // Buscar usuario por ID
  async findById(id: string): Promise<Omit<User, 'password'>> {
    const user = await this.userModel.findByPk(id);
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const { password, ...result } = user.toJSON();
    result.balance = Number(result.balance).toFixed(2);
    return result;
  }

  // Actualizar balance
  async updateBalance(userId: string, amount: number): Promise<Omit<User, 'password'>> {
    const user = await this.userModel.findByPk(userId);
    if (!user) throw new NotFoundException('Usuario no encontrado');

    user.balance = amount;
    await user.save();

    const { password, ...result } = user.toJSON();
    result.balance = Number(result.balance).toFixed(2);
    return result;
  }

  // Realizar transferencia
  async transfer(
    fromUserId: string,
    transferDto: TransferDto,
  ): Promise<{
    from: Omit<User, 'password'>;
    to: Omit<User, 'password'>;
    transaction: any;
  }> {
    if (fromUserId === transferDto.toUserId) {
      throw new BadRequestException('No puedes transferirte dinero a ti mismo');
    }

    const fromUser = await this.userModel.findByPk(fromUserId);
    if (!fromUser) throw new NotFoundException('Usuario remitente no encontrado');

    const toUser = await this.userModel.findByPk(transferDto.toUserId);
    if (!toUser) throw new NotFoundException('Usuario destinatario no encontrado');

    if (Number(fromUser.balance) < transferDto.amount) {
      throw new BadRequestException('Saldo insuficiente para realizar la transferencia');
    }

    // Actualizar balances
    fromUser.balance = Number(fromUser.balance) - Number(transferDto.amount);
    toUser.balance = Number(toUser.balance) + Number(transferDto.amount);

    await fromUser.save();
    await toUser.save();

    // Registrar transacción
    const transaction = await this.transactionModel.create({
      sender_id: fromUser.id,
      receiver_id: toUser.id,
      amount: transferDto.amount,
      description: `Transferencia de ${fromUser.name} a ${toUser.name}`,
    } as CreationAttributes<Transaction>);

    const { password: _, ...from } = fromUser.toJSON();
    const { password: __, ...to } = toUser.toJSON();

    from.balance = Number(from.balance).toFixed(2);
    to.balance = Number(to.balance).toFixed(2);

    return { from, to, transaction };
  }

  // Obtener historial de transacciones
  async getTransactions(userId: string) {
    const transactions = await this.transactionModel.findAll({
      where: {
        [Op.or]: [
          { sender_id: userId },
          { receiver_id: userId },
        ],
      },
      order: [['createdAt', 'DESC']],
    });

    return transactions.map(t => ({
      id: t.id,
      sender_id: t.sender_id,
      receiver_id: t.receiver_id,
      amount: Number(t.amount).toFixed(2),
      description: t.description,
      date: t.createdAt,
      type: t.sender_id === userId ? 'sent' : 'received',
    }));
  }
}