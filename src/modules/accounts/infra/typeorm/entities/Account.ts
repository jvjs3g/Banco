import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('accounts')
class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  cpf:string;

}
export default Account;
