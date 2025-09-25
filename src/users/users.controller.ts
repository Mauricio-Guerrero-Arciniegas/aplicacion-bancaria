import { Body, Controller, Get, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { Request } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { TransferDto } from './dto/transfer.dto';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Obtener perfil del usuario autenticado
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Req() req: Request) {
    const user = req.user as any;
    return this.usersService.findById(user.id);
  }

  // Registro de usuario
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    // Llama al método "create" de UsersService
    // ya elimina password y genera account_number bancario
    return this.usersService.create(createUserDto);
  }

  // Listar todos los usuarios (sin password)
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch('transfer')
  async transfer(@Req() req: Request, @Body() transferDto: TransferDto) {
    const user = req.user as any; // remitente
    return this.usersService.transfer(user.id, transferDto);
  }
}