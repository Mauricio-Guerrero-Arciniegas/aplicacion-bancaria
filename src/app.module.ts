import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { TransactionsModule } from './transactions/transactions.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        dialect: 'postgres',
        host: config.get<string>('DATABASE_HOST') ?? 'localhost',
        port: parseInt(config.get<string>('DATABASE_PORT') ?? '5432', 10),
        username: config.get<string>('DATABASE_USERNAME') ?? 'postgres',
        password: config.get<string>('DATABASE_PASSWORD') ?? '',
        database: config.get<string>('DATABASE_NAME') ?? 'testdb',
        autoLoadModels: true,
        //sync: { force: true },
        synchronize: true,
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
        logging: false,
      }),
    }),
    UsersModule,
    AuthModule,
    TransactionsModule,
  ],
})
export class AppModule {}