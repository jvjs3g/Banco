import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export default class AddagenciaecontaAccounts1611624693678 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn('accounts',new TableColumn({
        name:'agencia',
        type:'varchar',
        isNullable:false,
      }),
    );

    await queryRunner.addColumn('accounts',new TableColumn({
      name:'conta',
      type:'varchar',
      isNullable:false,
    }),
  );

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('accounts','agencia');
    await queryRunner.dropColumn('accounts','conta');
  }

}
