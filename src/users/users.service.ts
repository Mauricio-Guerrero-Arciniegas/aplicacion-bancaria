import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // 1️⃣ Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // 2️⃣ Generar número de cuenta único (puede ser uuid o algo custom)
    const accountNumber = uuidv4();

    // 3️⃣ Crear el usuario
    return this.userModel.create({
      name: createUserDto.name,
      email: createUserDto.email,
      password: hashedPassword,
      account_number: accountNumber,
      balance: 0,
    } as any);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }
}