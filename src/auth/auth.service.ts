import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  // Registro con creación de usuario + token
  async register(createUserDto: CreateUserDto) {
  // Crear usuario (sin password en la respuesta)
  const user = await this.usersService.create(createUserDto);

  // user ya no tiene password, puedes usarlo directamente
  const payload = { id: user.id, email: user.email, name: user.name };
  return {
    access_token: this.jwtService.sign(payload),
    token_type: 'bearer',
    expires_in: process.env.JWT_EXPIRES_IN || '3h',
    user, // ya no contiene password
  };
}

// Validar credenciales en login
async validateUser(email: string, pass: string) {
  const user = await this.usersService.findByEmail(email);
  if (!user) return null;

  const match = await bcrypt.compare(pass, user.password);
  if (!match) return null;

  const plain = user.toJSON();
const { password, ...plainUser } = plain;
return plainUser;
}

  // Generar JWT en login
  async login(user: any) {
    const payload = { id: user.id, email: user.email, name: user.name };
    return {
      access_token: this.jwtService.sign(payload),
      token_type: 'bearer',
      expires_in: process.env.JWT_EXPIRES_IN || '3h',
      user,
    };
  }
}