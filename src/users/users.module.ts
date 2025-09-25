import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forFeature([User]), // 👈 modelo User
    forwardRef(() => AuthModule),       // 👈 evita circular import con AuthModule
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],              // 👈 permite que AuthService lo use
})
export class UsersModule {}