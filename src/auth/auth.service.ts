import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { UniqueConstraintError, ValidationError } from 'sequelize';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    try {
      const user = await this.usersService.create(createUserDto);

      return {
        message: 'Usuario registrado exitosamente',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          account_number: user.account_number,
          balance: user.balance,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      };
    } catch (error: any) {
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

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;

    // Comparación de contraseña con bcrypt
    const isPasswordValid = await import('bcrypt').then(bcrypt =>
      bcrypt.compare(pass, user.password),
    );
    if (!isPasswordValid) return null;

    return user;
  }

  async login(user: any) {
    const payload = { id: user.id, email: user.email, name: user.name };

    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '3h' }),
      token_type: 'bearer',
      expires_in: '3h',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        account_number: user.account_number,
        balance: Number(user.balance).toFixed(2),
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  }
}