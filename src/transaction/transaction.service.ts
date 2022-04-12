import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './entities/transaction.model';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction)
    private transactionModel: typeof Transaction,
  ) {}
  
  async create(transaction: CreateTransactionDto): Promise<Transaction> {
    return await this.transactionModel.create<Transaction>({ ...transaction});
  }
  async findAll(): Promise<Transaction[]> {
    return this.transactionModel.findAll();
  }

  findOne(id: string): Promise<Transaction> {
    return this.transactionModel.findOne({
      where: {
        id,
      },
    });
  }
  
  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}
