import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export default class AddCpfAccount1611622972029 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('accounts',new TableColumn({
      name:'cpf',
      type:'varchar',
      isNullable:false,
    }),
    );

    await queryRunner.createForeignKey('accounts', new TableForeignKey({
      name:'acccountCpf',
      columnNames: ['cpf'],
      referencedColumnNames: ['cpf'],
      referencedTableName:'users',
      onDelete:'SET NULL', // o que vai acontecer com os agendamentos dessse usuario caso ele seja deletado no sistema/
      onUpdate:'CASCADE'// caso alguma informaçã ocomo o ID for alterado essa informação reflita nos relacionamentos
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('accounts', 'acccountCpf');
    await queryRunner.dropColumn('accounts','cpf');
  }

}
