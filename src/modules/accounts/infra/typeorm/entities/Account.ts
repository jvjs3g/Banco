import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('accounts')
class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  cpf:string;

  @Column()
  agencia:string;

  @Column()
  conta:string;


  @CreateDateColumn()
  created_at:Date;


  @UpdateDateColumn()
  updated_at: Date;

}
export default Account;
