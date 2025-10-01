import { 
  Body, 
  Controller, 
  HttpCode, 
  HttpStatus, 
  Post, 
  UnauthorizedException 
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('api/users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK) // 👈 fuerza 200 en caso de éxito
  async login(@Body() dto: { email: string; password: string }) {
    const user = await this.authService.validateUser(dto.email, dto.password);

    if (!user) {
      // 👇 Esto devuelve un 401 automáticamente
      throw new UnauthorizedException('Credenciales inválidas');
    }

    return this.authService.login(user);
  }
}