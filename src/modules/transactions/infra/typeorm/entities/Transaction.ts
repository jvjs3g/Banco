import { Entity, PrimaryGeneratedColumn, Column, JoinColumn,
  ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

import Account from '@modules/accounts/infra/typeorm/entities/Account';
@Entity('transactions')
class Transaction {

@PrimaryGeneratedColumn('uuid')
id: string;

@Column()
title: string;

@Column()
type: string;

@Column()
value: number;

@Column()
idAccount: string;

@ManyToOne(() => Account)
@JoinColumn({ name: 'idAccount' })
account: Account;

@CreateDateColumn()
created_at: Date;

@UpdateDateColumn()
updated_at: Date;

}

export default Transaction;
