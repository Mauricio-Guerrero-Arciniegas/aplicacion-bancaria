import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthModule } from '../auth/auth.module';
import { Transaction } from '../transactions/entities/transaction.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Transaction]),
    forwardRef(() => AuthModule),       
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],         
})
export class UsersModule {}