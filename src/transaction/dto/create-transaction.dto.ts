import { IsEnum, IsNotEmpty, IsNumber, IsNumberString } from "class-validator";
export enum TransactionTypeEnum  {
    credit,
    debit,
    // other
}

export class CreateTransactionDto {
    @IsNotEmpty()
    @IsEnum(TransactionTypeEnum, {message: "Only 'credit' or 'debit' accepted"})
    readonly type: string;
    
    @IsNumber()
    readonly amount: number;
}
