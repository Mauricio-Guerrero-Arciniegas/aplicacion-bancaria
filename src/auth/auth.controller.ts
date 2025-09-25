import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Registro de nuevo usuario
   * @example POST /auth/register
   * {
   *   "name": "Mauricio",
   *   "email": "mauricio@mail.com",
   *   "password": "123456"
   * }
   */
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  /**
   * Login de usuario
   * @example POST /auth/login
   * {
   *   "email": "mauricio@mail.com",
   *   "password": "123456"
   * }
   */
  @Post('login')
  async login(@Body() dto: { email: string; password: string }) {
    const user = await this.authService.validateUser(dto.email, dto.password);
    if (!user) {
      return { message: 'Credenciales inválidas' };
    }
    return this.authService.login(user);
  }
}