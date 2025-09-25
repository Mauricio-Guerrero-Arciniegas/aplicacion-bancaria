import { Body, Controller, Get, NotFoundException, Param, Post, Req, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Controller('api/transactions')
export class TransactionsController {
  constructor(private readonly txService: TransactionsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Req() req: any, @Body() body: CreateTransactionDto) {
    const tx = await this.txService.create(req.user.id, body as any);
    return tx;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(@Req() req: any) {
    return this.txService.findAllForUser(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Req() req: any, @Param('id') id: string) {
    const tx = await this.txService.findById(id);
    if (tx.sender_id !== req.user.id && tx.receiver_id !== req.user.id)
      throw new NotFoundException('Transacción no encontrada para este usuario');
    return tx;
  }
}