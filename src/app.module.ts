import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Transaction } from './transaction/entities/transaction.model';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [

    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: ':memory:', // or ':memory:'
      autoLoadModels: true,
      models: [Transaction]
    }),

    TransactionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
