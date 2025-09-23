import { Module, OnModuleInit } from '@nestjs/common';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';
import { User } from '../users/models/user.model';
import { Transaction } from '../transactions/models/transaction.model';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService): SequelizeModuleOptions => ({
        dialect: 'postgres',
        host: config.get('DB_HOST'),
        port: Number(config.get('DB_PORT', 5432)),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        models: [User, Transaction],
        autoLoadModels: true,
        synchronize: true,
        logging: false,
      }),
    }),
  ],
  exports: [],
})
export class DatabaseModule implements OnModuleInit {
  constructor(private readonly sequelize: Sequelize) {}

  async onModuleInit() {
    // Ensure models are in sync for development purpose
    await this.sequelize.sync({ alter: true });
  }
}
