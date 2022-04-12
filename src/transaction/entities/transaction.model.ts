import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Transaction extends Model {
  @Column({
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true,})
  id: number;

  @Column
  type: string;

  @Column
  amount: number;
}