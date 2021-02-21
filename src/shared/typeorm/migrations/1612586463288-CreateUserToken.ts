import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserToken1612586463288 implements MigrationInterface {
    private table = new Table({
      name: 'user_tokens',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()',
        },
        {
          name: 'userId',
          type: 'uuid',
        },
        {
          name: 'status',
          type: 'boolean',
          default: false
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()',
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          default: 'now()',
        },
      ],
      foreignKeys: [
        {
          name: 'FK_Token_User',
          referencedTableName: 'users',
          referencedColumnNames: ['id'],
          columnNames: ['userId'],
          onDelete: "CASCADE",
          onUpdate: "CASCADE"
        },
      ],
    })

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(this.table);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('user_tokens');
    }
}
