import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default  class CreateAccount1611620821155 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name:'accounts',
          columns:[

              {
                name: 'id',
                type: 'uuid',
                isPrimary:true,
                generationStrategy:'uuid',
                default: 'uuid_generate_v4()',
              },
              {
                name:'agencia',
                type:'varchar',
              },
              {
                name:'conta',
                type:'varchar',
              },
              {
                name:'created_at',
                type:'timestamp',
                default:'now()'
              },
              {
                name:'updated_at',
                type:'timestamp',
                default:'now()'
              },
          ],
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('accounts');
    }

}
