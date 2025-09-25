import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { TransferDto } from './dto/transfer.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  // Crear usuario con balance opcional
  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // Número de cuenta estilo bancario: AC- seguido de 10 dígitos
    const accountNumber =
      'AC-' + Math.floor(1000000000 + Math.random() * 9000000000).toString();

    const user = await this.userModel.create({
      name: createUserDto.name,
      email: createUserDto.email,
      password: hashedPassword,
      account_number: accountNumber,
      balance: createUserDto.balance ?? 0, // si no se envía, balance 0
    } as any);

    const { password, ...result } = user.toJSON();
    result.balance = Number(result.balance).toFixed(2);
    return result;
  }

  // Obtener todos los usuarios (sin password)
  async findAll(): Promise<Omit<User, 'password'>[]> {
    const users = await this.userModel.findAll();
    return users.map(u => {
      const { password, ...result } = u.toJSON();
      result.balance = Number(result.balance).toFixed(2);
      return result;
    });
  }

  // Buscar usuario por email (incluye password para login)
  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ where: { email } });
  }

  // Buscar usuario por id (sin password)
  async findById(id: string): Promise<Omit<User, 'password'>> {
    const user = await this.userModel.findByPk(id);
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const { password, ...result } = user.toJSON();
    result.balance = Number(result.balance).toFixed(2);
    return result;
  }

  // Actualizar balance de un usuario
  async updateBalance(userId: string, amount: number): Promise<Omit<User, 'password'>> {
    const user = await this.userModel.findByPk(userId);
    if (!user) throw new NotFoundException('Usuario no encontrado');

    user.balance = amount;
    await user.save();

    const { password, ...result } = user.toJSON();
    result.balance = Number(result.balance).toFixed(2);
    return result;
  }

  // Transferencia entre usuarios
  async transfer(
    fromUserId: string,
    transferDto: TransferDto,
  ): Promise<{ from: Omit<User, 'password'>; to: Omit<User, 'password'> }> {
    const fromUser = await this.userModel.findByPk(fromUserId);
    if (!fromUser) throw new NotFoundException('Usuario remitente no encontrado');

    const toUser = await this.userModel.findByPk(transferDto.toUserId);
    if (!toUser) throw new NotFoundException('Usuario destinatario no encontrado');

    if (Number(fromUser.balance) < transferDto.amount) {
      throw new Error('Saldo insuficiente para realizar la transferencia');
    }

    // Realizar transferencia como números
    fromUser.balance = Number(fromUser.balance) - Number(transferDto.amount);
    toUser.balance = Number(toUser.balance) + Number(transferDto.amount);

    await fromUser.save();
    await toUser.save();

    const { password: _, ...from } = fromUser.toJSON();
    const { password: __, ...to } = toUser.toJSON();

    from.balance = Number(from.balance).toFixed(2);
    to.balance = Number(to.balance).toFixed(2);

    return { from, to };
  }
}