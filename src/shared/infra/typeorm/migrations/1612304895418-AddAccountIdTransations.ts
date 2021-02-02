import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddAccountIdTransations1612304895418 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('transactions',new TableColumn({
      name:'account',
      type:'varchar',
      isNullable:false,
    }),
    );

    await queryRunner.createForeignKey('transactions', new TableForeignKey({
      name:'idAccount',
      columnNames: ['account'],
      referencedColumnNames: ['id'],
      referencedTableName:'accounts',
      onDelete:'SET NULL', // o que vai acontecer com os agendamentos dessse usuario caso ele seja deletado no sistema
      onUpdate:'CASCADE'// caso alguma informaçã ocomo o ID for alterado essa informação reflita nos relacionamentos
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('transactions', 'idAccount');
    await queryRunner.dropColumn('transactions','acccount');
  }

}
